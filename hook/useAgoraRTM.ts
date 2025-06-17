"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "sonner"
import type { ReactionMessage } from "@/lib/initAgoraClient"
import type { SessionPayload } from "@/lib/session"
import { initializeAgoraRTM, publishMessage } from "@/lib/agora"
import { Message } from "@/types/message"
import { generateObjectId } from "@/lib/object-id"

// Add this helper function at the top of the file
const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

interface UseAgoraRTMProps {
  channel: string
  user: SessionPayload
}

export function useAgoraRTM({ user, channel }: UseAgoraRTMProps) {
  const [raisedHands, setRaisedHands] = useState<Set<string>>(new Set())
  const [pendingRequests, setPendingRequests] = useState<Map<string, { name: string; timestamp: number }>>(new Map())
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [reactions, setReactions] = useState<Set<ReactionMessage>>(new Set())
  const [rtm, setRtm] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const raisedHandsRef = useRef(raisedHands)
  const pendingRequestsRef = useRef(pendingRequests)
  const reactionsRef = useRef(reactions)

   const scrollToBottom = useCallback(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])
  
    useEffect(() => {
      const fetchMessages = async () => {
        
        try {
          const response = await fetch(`/api/message/${channel}`)
          const data = await response.json()
      
          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch messages')
          }
          if (!data.messages || !Array.isArray(data.messages)) {
            console.error("Invalid messages format:", data.messages)
            return
          }

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

            setTimeout(() => {
              scrollToBottom()
            }, 100)
          }
        } catch (error) {
          console.error("Error fetching messages:", error)
          toast.error("Failed to load messages")
        } 
      }
      fetchMessages()
    }, [channel])
  
    useEffect(() => {
      scrollToBottom()
    }, [messages, scrollToBottom])

  useEffect(() => {
    raisedHandsRef.current = raisedHands
  }, [raisedHands])

  useEffect(() => {
    pendingRequestsRef.current = pendingRequests
  }, [pendingRequests])

  useEffect(() => {
    reactionsRef.current = reactions
  }, [reactions])

  // Stable event handler functions
  const handleChannelMessage = useCallback((message: any) => {
    try {
      const messageData = JSON.parse(message.message || message)

      console.log("Received message:", messageData)

      if (messageData.type === "raised") {
        setRaisedHands((prev) => {
          const newSet = new Set(prev)
          newSet.add(messageData.userId)
          return newSet
        })

        setPendingRequests((prev) => {
          const newMap = new Map(prev)
          // Extract name from userId (assuming format: userId-name)
          const namePart = messageData.userId.split("-").pop() || messageData.userId
          newMap.set(messageData.userId, {
            name: namePart,
            timestamp: Date.now(),
          })
          return newMap
        })

        toast(`${messageData.userId.split("-").pop() || messageData.userId} raised their hand`)
      } else if (messageData.type === "lowered") {
        setRaisedHands((prev) => {
          const newSet = new Set(prev)
          newSet.delete(messageData.userId)
          return newSet
        })

        setPendingRequests((prev) => {
          const newMap = new Map(prev)
          newMap.delete(messageData.userId)
          return newMap
        })
      } else if (messageData.type === "reaction") {
        setReactions((prev) => {
          const newSet = new Set(prev)
          newSet.add(messageData)
          return newSet
        })

        // Auto-remove reaction after 3 seconds
        setTimeout(() => {
          setReactions((prev) => {
            const newSet = new Set(prev)
            newSet.delete(messageData)
            return newSet
          })
        }, 3000)
      } else  if (messageData.type === "text") {
          const msg: Message = {
            id: messageData.id || `${message.publisher}-${Date.now()}`,
            text: messageData.text,
            type:messageData.type || "text",
            senderId: messageData.senderId,
            sender: messageData.sender,
            channelName: channel,
            timestamp: new Date(messageData.timestamp || Date.now()),
            isCurrentUser: message.publisher === user.userId,
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
      console.error("Failed to parse message:", error)
    }
  }, [])

  const handlePresence = useCallback((event: any) => {
    if (event.eventType === "SNAPSHOT") {
      toast("Successfully joined the meeting")
      setIsConnected(true)
    } else {
      const userName = event.publisher?.split("-").pop() || event.publisher
      toast(`${userName} is ${event.eventType.toLowerCase()}`)
    }
  }, [])

  const handleStatus = useCallback((event: any) => {
    console.log("RTM status changed:", event.state, event.reason)

    if (event.state === "CONNECTED") {
      setIsConnected(true)
    } else if (event.state === "DISCONNECTED") {
      setIsConnected(false)
    }
  }, [])

  // Initialize RTM
  useEffect(() => {
    if (!user || !channel) return

    let mounted = true
    let currentRtm: any = null

    const setupRTM = async () => {
      try {
        setIsLoading(true)

        // Create a unique user ID for this session
        const sessionUser = {
          ...user,
          userId: `${user.userId}-${generateSessionId()}`,
        }

        const { rtm: rtmInstance } = await initializeAgoraRTM(sessionUser, channel)

        if (!mounted) return

        currentRtm = rtmInstance
        setRtm(rtmInstance)

        // Add event listeners
        rtmInstance.addEventListener("message", handleChannelMessage)
        rtmInstance.addEventListener("presence", handlePresence)
        rtmInstance.addEventListener("status", handleStatus)

        console.log("RTM initialized successfully", { rtm: rtmInstance, user: sessionUser, channel })
      } catch (error) {
        console.error("Failed to initialize Agora RTM:", error)
        toast.error("Failed to connect to chat service")
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    setupRTM()

    return () => {
      mounted = false
      if (currentRtm) {
        try {
          currentRtm.removeEventListener("message", handleChannelMessage)
          currentRtm.removeEventListener("presence", handlePresence)
          currentRtm.removeEventListener("status", handleStatus)
          // Ensure proper logout
          currentRtm.logout()
        } catch (error) {
          console.error("Error cleaning up RTM:", error)
        }
      }
    }
  }, [user, channel, handleChannelMessage, handlePresence, handleStatus])

  const toggleHand = useCallback(
    async (userId: string) => {
      if (!rtm) {
        toast.error("Chat service not connected")
        return isHandRaised
      }

      try {
        const newHandState = !isHandRaised

        const message = {
          type: newHandState ? "raised" : "lowered",
          userId,
          timestamp: Date.now(),
        }

        await publishMessage(rtm, channel, message)
        setIsHandRaised(newHandState)

        // Update local state immediately for better UX
        setRaisedHands((prev) => {
          const newSet = new Set(prev)
          if (newHandState) {
            newSet.add(userId)
          } else {
            newSet.delete(userId)
          }
          return newSet
        })

        return newHandState
      } catch (error) {
        console.error("Failed to toggle hand state:", error)
        toast.error("Failed to change hand state")
        return isHandRaised
      }
    },
    [rtm, isConnected, isHandRaised, channel],
  )

  const sendReaction = useCallback(
    async (reactionMessage: ReactionMessage) => {
      if (!rtm || !isConnected) {
        console.error("RTM is not connected")
        toast.error("Chat service not connected")
        return
      }

      try {
        const message = {
          ...reactionMessage,
          type: "reaction",
          timestamp: Date.now(),
        }

        await publishMessage(rtm, channel, message)

        // Add to local reactions immediately
        setReactions((prev) => {
          const newSet = new Set(prev)
          newSet.add(message as ReactionMessage)
          return newSet
        })
      } catch (error) {
        console.error("Failed to send reaction:", error)
        toast.error("Failed to send reaction")
      }
    },
    [rtm, isConnected, channel],
  )

  const clearReactions = useCallback(() => {
    setReactions(new Set())
  }, [])

  const getUserName = useCallback((userId: string) => {
    return userId.split("-").pop() || userId
  }, [])


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
        type: "text",
        isCurrentUser:true,
        text,
        sender: user.name,
        senderId: user.userId,
        timestamp: timestamp,
        channelName: channel,
        reactions: [],
        file,
      }

      if (replyingTo) {
        messageData.replyTo = replyingTo.text
        messageData.replyToId = replyingTo.id
        messageData.replyToSender = replyingTo.sender
      }

      const published = await publishMessage(rtm, channel, messageData)

      if (published) {

        const newMessage: Message = {
          ...messageData,
          timestamp,
          isCurrentUser: true,
        }

        setMessages((prev) => [...prev, newMessage])
      }

      setReplyingTo(null)

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

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {

            const existingReaction = msg.reactions.find((r) => r.userId === user.userId && r.emoji === emoji)

            if (existingReaction) {

              return {
                ...msg,
                reactions: msg.reactions.filter((r) => !(r.userId === user.userId && r.emoji === emoji)),
              }
            } else {

              return {
                ...msg,
                reactions: [...msg.reactions, reaction],
              }
            }
          }
          return msg
        }),
      )

      await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          emoji,
          userId: user.userId,
        }),
      })
    } catch (error) {
      console.error("Error adding reaction:", error)
      toast.error("Failed to add reaction")
    }
  }
  const removeReaction = async (messageId: string, emoji: string) => {
    if (!rtm) {
      toast.error("You are not connected to the chat server")
      return
    }

    try {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              reactions: msg.reactions.filter((r) => !(r.userId === user.userId && r.emoji === emoji)),
            }
          }
          return msg
        }),
      )

      await fetch("/api/reactions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          emoji,
        }),
      })
    } catch (error) {
      console.error("Error removing reaction:", error)
      toast.error("Failed to remove reaction")
    }
  }
  const handleReply = (message: Message) => {
    setReplyingTo(message)
  }
  const clearReply = () => {
    setReplyingTo(null)
  }

  const handleScroll = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  
  const handleTyping = useCallback( async () => {
    if (!rtm || !isConnected) return
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout( async () => {

      const messageData = {
        type: "typing",
        userId: user.userId,
        timestamp: Date.now(),
      }
      try {
        await publishMessage(rtm, channel, messageData)
      } catch (error) {
        console.error("Failed to send typing indicator:", error)
        toast.error("Failed to send typing indicator")
      }

    }, 1000)
  }, [rtm, isConnected, user.userId])

  return {
    raisedHands,
    pendingRequests,
    isHandRaised,
    addReaction,
    removeReaction,
    handleReply,
    clearReply,
    messages,
    setReplyingTo,
    messagesEndRef,
    replyingTo,
    reactions,
    handleTyping,
    sendMessage,
    typingTimeoutRef,
    isLoading,
    isConnected,
    rtm,
    toggleHand,
    sendReaction,
    clearReactions,
    getUserName,
  }
}
