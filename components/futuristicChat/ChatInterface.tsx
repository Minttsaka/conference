"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import { SessionPayload } from "@/lib/session"
import { toast } from "sonner"
import { publishMessage } from "../../lib/agora"
import { Message } from "@/types/message"
import { generateObjectId } from "@/lib/object-id"

interface ChatInterfaceProps {
  user: SessionPayload
  rtm: any
  channelName: string
}

export default function ChatInterface({ user, rtm, channelName }: ChatInterfaceProps) {

  const [messages, setMessages] = useState<Message[]>([])
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [channelName])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (!rtm) return

    const handleMessage = async (event: any) => {
      try {
        const messageData = JSON.parse(event.message)

        if (messageData.type === "text") {
          const msg: Message = {
            id: messageData.id || `${event.publisher}-${Date.now()}`,
            text: messageData.text,
            senderId: messageData.senderId,
            sender: messageData.sender,
            channelName,
            timestamp: new Date(messageData.timestamp || Date.now()),
            isCurrentUser: event.publisher === user.userId,
            reactions: messageData.reactions || [],
            replyTo: messageData.replyTo,
            replyToSender: messageData.replyToSender,
            replyToId: messageData.replyToId,
            file: messageData.file,
          }

          setMessages((prev) => {
            // Check if message already exists to prevent duplicates
            if (prev.some((m) => m.id === msg.id)) {
              return prev
            }
            return [...prev, msg]
          })
        } else if (messageData.type === "reaction" && messageData.messageId) {
          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.id === messageData.messageId) {
                const reaction = messageData.reaction

                // Check if reaction already exists
                const existingReactionIndex = msg.reactions.findIndex(
                  (r) => r.userId === reaction.userId && r.emoji === reaction.emoji,
                )

                if (existingReactionIndex >= 0) {
                  // Remove reaction
                  return {
                    ...msg,
                    reactions: msg.reactions.filter((_, i) => i !== existingReactionIndex),
                  }
                } else {
                  // Add reaction
                  return {
                    ...msg,
                    reactions: [...msg.reactions, reaction],
                  }
                }
              }
              return msg
            }),
          )
        } else if (messageData.type === "typing") {
          // Handle typing indicator if needed
        }
      } catch (error) {
        console.error("Error parsing message:", error)
      }
    }

    // Presence event handler
    const handlePresence = (event: any) => {
      if (event.eventType === "SNAPSHOT") {
        console.log("Joined channel:", channelName)
      } else {
        console.log(`${event.publisher} is ${event.type}`)
      }
    }

    // Status event handler
    const handleStatus = (event: any) => {
      console.log("RTM status changed:", event.state, event.reason)
    }

    // Add event listeners
    rtm.addEventListener("message", handleMessage)
    rtm.addEventListener("presence", handlePresence)
    rtm.addEventListener("status", handleStatus)

    // Cleanup function
    return () => {
      if (rtm) {
        rtm.removeEventListener("message", handleMessage)
        rtm.removeEventListener("presence", handlePresence)
        rtm.removeEventListener("status", handleStatus)
      }

      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [rtm, channelName, user.userId])


const fetchMessages = async () => {
  
  try {
    const response = await fetch(`/api/message/${channelName}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch messages')
    }

    console.log("the messages", data.messages)
    const formattedMessages: Message[] = data.messages.map((msg: any) => ({
        id: msg.id,
        text: msg.text,
        sender: msg.sender,
        senderId: msg.senderId,
        timestamp: new Date(msg.timestamp),
        isCurrentUser: msg.isCurrentUser,
        reactions: msg.reactions || [],
        replyTo: msg.replyTo,
        replyToId: msg.replyToId,
        replyToSender: msg.replyToSender,
        file: msg.file,
      }))

      setMessages(formattedMessages)

    if (data.success && data.messages) {
      // Transform timestamps and ensure proper typing
      // const formattedMessages: Message[] = data.messages.map((msg: any) => ({
      //   id: msg.id,
      //   text: msg.text,
      //   sender: msg.sender,
      //   senderId: msg.senderId,
      //   timestamp: new Date(msg.timestamp),
      //   isCurrentUser: msg.isCurrentUser,
      //   reactions: msg.reactions || [],
      //   replyTo: msg.replyTo,
      //   replyToId: msg.replyToId,
      //   replyToSender: msg.replyToSender,
      //   file: msg.file,
      // }))

      
      
      // Scroll to bottom after messages are loaded
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  } catch (error) {
    console.error("Error fetching messages:", error)
    toast.error("Failed to load messages")
  } 
}

  // Send a message
  const sendMessage = async (text: string, file?: { name: string; url: string }) => {
    if (!rtm) {
      toast.error("You are not connected to the chat server")
      return
    }

    if (!text.trim() && !file) {
      return
    }

    try {
      const messageId = generateObjectId()
      const timestamp = new Date()

      const messageData : Message = {
        id: messageId,
        isCurrentUser:true,
        text,
        sender: user.name,
        senderId: user.userId,
        timestamp: timestamp,
        channelName,
        reactions: [],
        file,
      }

      // Add reply data if replying to a message
      if (replyingTo) {
        messageData.replyTo = replyingTo.text
        messageData.replyToId = replyingTo.id
        messageData.replyToSender = replyingTo.sender
      }

      // Publish to RTM
      const published = await publishMessage(rtm, channelName, messageData)

      if (published) {
        // Optimistically add message to local state
        const newMessage: Message = {
          ...messageData,
          timestamp,
          isCurrentUser: true,
        }

        setMessages((prev) => [...prev, newMessage])
      }

      // Clear reply state
      setReplyingTo(null)

      // Save to database
      await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      })

      scrollToBottom()
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message")
    }
  }

  // Add reaction to a message
  const addReaction = async (messageId: string, emoji: string) => {
    if (!rtm) {
      toast.error("You are not connected to the chat server")
      return
    }

    try {
      const reaction = {
        emoji,
        userId: user.userId,
        userName: user.name,
      }

      // Publish reaction to RTM
     

      // Optimistically update UI
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            // Check if reaction already exists
            const existingReaction = msg.reactions.find((r) => r.userId === user.userId && r.emoji === emoji)

            if (existingReaction) {
              // Remove reaction
              return {
                ...msg,
                reactions: msg.reactions.filter((r) => !(r.userId === user.userId && r.emoji === emoji)),
              }
            } else {
              // Add reaction
              return {
                ...msg,
                reactions: [...msg.reactions, reaction],
              }
            }
          }
          return msg
        }),
      )

      // Save to database
      await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          emoji,
        }),
      })
    } catch (error) {
      console.error("Error adding reaction:", error)
      toast.error("Failed to add reaction")
    }
  }

  // Handle typing indicator
  const handleTyping = () => {
    if (!rtm) return

    // publishRTMMessage("typing", {
    //   userId: user.userId,
    //   userName: user.name,
    // })

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      // publishRTMMessage("stopTyping", {
      //   userId: user.userId,
      // })
    }, 2000)
  }

  return (
    <div className="flex flex-col max-h-full">
      <div className="flex-1 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent p-4">
        <MessageList
          messages={messages}
          setReplyingTo={setReplyingTo}
          addReaction={addReaction}
          currentUserId={user.userId}
        />
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
        <MessageInput
          onSendMessage={sendMessage}
          onTyping={handleTyping}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
        />
      </div>
    </div>
  )
}
