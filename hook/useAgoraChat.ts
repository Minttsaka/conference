"use client"

import { useState, useEffect, useCallback } from "react"
import { type ChatMessage, getAgoraToken, initAgoraClient, type NewMessageData } from "@/lib/initAgoraClient"
import type { SessionPayload } from "@/lib/session"
import { getOrCreateUserId } from "@/lib/userGn"
import { saveMessage, getMessages } from "@/lib/action"
import { RtmChannel } from "agora-rtm-react"

export function useAgoraChat(appId: string, userInfo: SessionPayload, channelName: string) {
  const [client, setClient] = useState<any>(null)
  const [channel, setChannel] = useState<RtmChannel>()
  const [messageList, setMessages] = useState<ChatMessage[]>([])
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set())
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Load previous messages from database
  useEffect(() => {
    async function loadMessages() {
      if (channelName) {
        setIsLoading(true)
        try {
          const dbMessages = await getMessages(channelName)
          if (Array.isArray(dbMessages)) {
            setMessages(dbMessages)
          } else {
            console.error("Invalid messages format returned from database:", dbMessages)
            setMessages([])
          }
        } catch (error) {
          console.error("Error loading messages:", error)
          setMessages([])
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadMessages()
  }, [channelName])

  // Initialize client and connect
  useEffect(() => {
    let mounted = true
    const connect = async () => {
      try {
        console.log("Initializing Agora client with appId:", appId)
        const agoraClient = initAgoraClient(appId)
        if (!mounted) return
        setClient(agoraClient)

        // Get token and login
        const userId = getOrCreateUserId(userInfo).replace(/\s+/g, "_")
        console.log("Getting token for user:", userId)
        const token = await getAgoraToken(userId)

        console.log("Logging in with token:", token ? "Token received" : "No token")
        await agoraClient.login({ uid: userId, token })

        console.log("Creating and joining channel:", channelName)
        const channelClient = agoraClient.createChannel(channelName)
        await channelClient.join()
        if (!mounted) return
        setChannel(channelClient)
        console.log("Successfully joined channel:", channelName)

        // Set up message listeners
        channel.on("ChannelMessage", async (message: any) => {
          if (!mounted) return

          try {
            console.log("Raw message received:", message.text)
            const messageData = JSON.parse(message.text)
            console.log("Parsed message data:", messageData)

            if (messageData.type === "typing") {
              setTypingUsers((prev) => new Set(prev).add(userInfo.userId))
              setTimeout(() => {
                if (!mounted) return
                setTypingUsers((prev) => {
                  const newSet = new Set(prev)
                  newSet.delete(userInfo.userId)
                  return newSet
                })
              }, 3000)
              return
            }

            // For status updates and reactions
            if (
              messageData.type === "status_update" ||
              messageData.type === "reaction" ||
              messageData.type === "bookmark_update"
            ) {
              console.log("Received update:", messageData.type, messageData)
              // Handle these updates separately
              return
            }

            // Ensure the message has all required fields before adding to state
            if (messageData.text !== undefined && messageData.sender) {
              console.log("Adding message to state:", messageData)

              // Ensure the message has an ID
              const messageWithId = {
                ...messageData,
                id: messageData.id || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
              }

              setMessages((prevMessages) => {
                return [...prevMessages, messageWithId]
              })

              // Save to database in the background
              try {
                await saveMessage(messageWithId, channelName)
                console.log("Message saved to database:", messageWithId.id)
              } catch (error) {
                console.error("Error saving message to database:", error)
              }
            } else {
              console.warn("Received invalid message format:", messageData)
            }
          } catch (error) {
            console.error("Error processing message:", error, "Raw message:", message.text)
          }
        })

        // Handle member join/leave
        channel.on("MemberJoined", (memberId: string) => {
          if (!mounted) return
          console.log("Member joined:", memberId)
          setOnlineUsers((prev) => new Set(prev).add(memberId))
        })

        channel.on("MemberLeft", (memberId: string) => {
          if (!mounted) return
          console.log("Member left:", memberId)
          setOnlineUsers((prev) => {
            const newSet = new Set(prev)
            newSet.delete(memberId)
            return newSet
          })
        })

        // Get channel members
        const members = await channel.getMembers()
        console.log("Channel members:", members)
        if (!mounted) return
        setOnlineUsers(new Set(members))
      } catch (error) {
        console.error("Error connecting to Agora:", error)
      }
    }

    if (appId && userInfo && getOrCreateUserId(userInfo).replace(/\s+/g, "_")) {
      connect()
    } else {
      console.warn("Missing required parameters:", { appId, userInfo })
    }

  }, [appId, userInfo, channelName])

  // Send message function
  const sendMessage = useCallback(
    async (messageData: NewMessageData) => {
      if (!channel) {
        console.error("Cannot send message: Channel not initialized")
        return false
      }

      try {
        // Ensure the message has an ID and timestamp
        const completeMessage = {
          ...messageData,
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          timestamp: messageData.timestamp || Date.now(),
          status: messageData.status || "sending",
        }

        console.log("Sending message:", completeMessage)

        // Send via Agora for real-time delivery
        await channel.sendMessage({
          text: completeMessage
        })
        console.log("Message sent via Agora")

        // Update local message status to "sent"
        setMessages((prev) => prev.map((msg) => (msg.id === completeMessage.id ? { ...msg, status: "sent" } : msg)))

        // Save to database
        try {
          //await saveMessage(completeMessage, channelName)
          console.log("Message saved to database")
        } catch (dbError) {
          console.error("Error saving message to database:", dbError)
          // Mark message as failed in UI if database save fails
          setMessages((prev) => prev.map((msg) => (msg.id === completeMessage.id ? { ...msg, status: "failed" } : msg)))
          return false
        }

        return true
      } catch (error) {
        console.error("Error sending message:", error)

        // Mark message as failed in UI
        setMessages((prev) => prev.map((msg) => (msg.id === messageData.senderId ? { ...msg, status: "failed" } : msg)))
        return false
      }
    },
    [channel, channelName],
  )

  // Send typing indicator
  const sendTypingIndicator = useCallback(async () => {
    if (!channel) return

    try {
      await channel.sendMessage({
        text: JSON.stringify({
          type: "typing",
          sender: getOrCreateUserId(userInfo).replace(/\s+/g, "_"),
          timestamp: Date.now(),
        }),
      })
    } catch (error) {
      console.error("Error sending typing indicator:", error)
    }
  }, [channel, userInfo])

  // Function to update message status
  const updateMessageStatus = useCallback(
    async (messageId: string, status: "sending" | "sent" | "delivered" | "read" | "failed") => {
      if (!channel) return false

      try {
        // Find the message in the current list
        const messageIndex = messageList.findIndex((msg) => msg.id === messageId)
        if (messageIndex === -1) {
          console.warn("Message not found for status update:", messageId)
          return false
        }

        // Update the message status locally
        const updatedMessages = [...messageList]
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          status,
        }
        setMessages(updatedMessages)

        // Send status update via Agora
        await channel.sendMessage({
          text: JSON.stringify({
            type: "status_update",
            messageId,
            status,
            timestamp: Date.now(),
          }),
        })

        // Update in database
        try {
          await fetch(`/api/messages`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messageId,
              updates: { status },
            }),
          })
          return true
        } catch (dbError) {
          console.error("Error updating message status in database:", dbError)
          return false
        }
      } catch (error) {
        console.error("Error updating message status:", error)
        return false
      }
    },
    [channel, messageList],
  )

  // Function to add reaction to a message
  const addReaction = useCallback(
    async (messageId: string, emoji: string) => {
      if (!channel || !userInfo) return false

      try {
        // Find the message in the current list
        const messageIndex = messageList.findIndex((msg) => msg.id === messageId)
        if (messageIndex === -1) {
          console.warn("Message not found for adding reaction:", messageId)
          return false
        }

        // Get current reactions or initialize empty array
        const currentReactions = messageList[messageIndex].reactions || []

        // Add the new reaction
        const newReaction = { emoji, userId: getOrCreateUserId(userInfo).replace(/\s+/g, "_") }
        const updatedReactions = [...currentReactions, newReaction]

        // Update the message locally
        const updatedMessages = [...messageList]
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          reactions: updatedReactions,
        }
        setMessages(updatedMessages)

        // Send reaction update via Agora
        await channel.sendMessage({
          text: JSON.stringify({
            type: "reaction",
            messageId,
            reaction: newReaction,
            timestamp: Date.now(),
          }),
        })

        // Update in database
        try {
          await fetch(`/api/messages`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messageId,
              updates: { reactions: updatedReactions },
            }),
          })
          return true
        } catch (dbError) {
          console.error("Error updating reactions in database:", dbError)
          return false
        }
      } catch (error) {
        console.error("Error adding reaction:", error)
        return false
      }
    },
    [channel, messageList, userInfo],
  )

  // Function to toggle bookmark status
  const toggleBookmark = useCallback(
    async (messageId: string) => {
      if (!channel) return false

      try {
        // Find the message in the current list
        const messageIndex = messageList.findIndex((msg) => msg.id === messageId)
        if (messageIndex === -1) {
          console.warn("Message not found for bookmark toggle:", messageId)
          return false
        }

        // Toggle bookmark status
        const currentBookmarked = messageList[messageIndex].bookmarked || false
        const newBookmarked = !currentBookmarked

        // Update the message locally
        const updatedMessages = [...messageList]
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          bookmarked: newBookmarked,
        }
        setMessages(updatedMessages)

        // Send bookmark update via Agora
        await channel.sendMessage({
          text: JSON.stringify({
            type: "bookmark_update",
            messageId,
            bookmarked: newBookmarked,
            timestamp: Date.now(),
          }),
        })

        // Update in database
        try {
          await fetch(`/api/messages`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messageId,
              updates: { bookmarked: newBookmarked },
            }),
          })
          return true
        } catch (dbError) {
          console.error("Error updating bookmark in database:", dbError)
          return false
        }
      } catch (error) {
        console.error("Error toggling bookmark:", error)
        return false
      }
    },
    [channel, messageList],
  )

  // Add these functions to the return object
  return {
    messageList,
    sendMessage,
    sendTypingIndicator,
    updateMessageStatus,
    addReaction,
    toggleBookmark,
    onlineUsers,
    typingUsers,
    isConnected: !!channel,
    isLoading,
  }
}
