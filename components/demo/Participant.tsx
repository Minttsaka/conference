"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Send, Smile, ImageIcon, Reply, X, Sparkles } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AnimatePresence, motion } from "framer-motion"
import { VoiceRecorder } from "../chat/VoiceRecorder"
import type { SessionPayload } from "@/lib/session"
import { createMessage, getMessages, sendReaction } from "@/lib/action"
import { publishMessage } from "./agora"
import type { MessageInput } from "./demoType"

// This is a placeholder for the emoji picker - you'll need to install a real one
// For example: npm install emoji-mart
interface EmojiPickerProps {
  onEmojiSelect: (emoji: any) => void
}

// Placeholder for emoji picker - replace with actual implementation
function Picker({ onEmojiSelect }: EmojiPickerProps) {
  const commonEmojis = ["😊", "👍", "❤️", "🎉", "🔥", "😂", "👏", "🙏"]

  return (
    <div className="p-2 grid grid-cols-4 gap-2">
      {commonEmojis.map((emoji) => (
        <button
          key={emoji}
          className="text-2xl p-2 hover:bg-white/10 rounded"
          onClick={() => onEmojiSelect({ native: emoji })}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

interface Reaction {
  emoji: string
  sender: string
}

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
  type: string
  isCurrentUser: boolean
  reactions: Reaction[]
  replyTo?: string
  replyToSender?: string
  file?: {
    name: string
    url: string
    type: string
  }
}

interface ChatInterfaceProps {
  user: SessionPayload
  rtm: any
  channelName: string
}

export default function ChatInterface({ user, rtm, channelName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAITyping, setIsAITyping] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const eventListenersSet = useRef(false)

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const fetchedMessages = await getMessages()
      setMessages(fetchedMessages)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
      // Show error toast or notification here
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  // Set up event listeners for RTM
  useEffect(() => {
    if (!rtm || eventListenersSet.current) return

    // Message event handler
    const handleMessage = async (event: any) => {
      console.log("Message received:", event.publisher, event.message)

      try {
        const messageData = JSON.parse(event.message)
        console.log("Parsed message data:", messageData)

        if (messageData.type === "text") {
          // Instead of fetching all messages again, just update the local state
          // This provides a more responsive experience
          const newMsg: Message = {
            id: messageData.id || `${event.publisher}-${messageData.timestamp}`,
            text: messageData.text,
            sender: messageData.sender || event.publisher,
            type: messageData.type,
            timestamp: new Date(messageData.timestamp),
            isCurrentUser: event.publisher === user.userId,
            reactions: messageData.reactions || [],
            replyTo: messageData.replyTo,
            replyToSender: messageData.replyToSender,
            file: messageData.file,
          }

          setMessages((prev) => {
            // Check if message already exists to prevent duplicates
            const messageExists = prev.some((msg) => msg.id === newMsg.id)
            if (messageExists) return prev
            return [...prev, newMsg]
          })

          // Optionally refresh from server to ensure consistency
          setTimeout(() => fetchMessages(), 1000)
        } else if (messageData.type === "reaction" && messageData.data) {
          // Handle reaction messages
          const { messageId, emoji, sender } = messageData.data

          // Update local state immediately for better UX
          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.id === messageId) {
                return {
                  ...msg,
                  reactions: [...(msg.reactions || []), { emoji, sender }],
                }
              }
              return msg
            }),
          )

          // Then refresh from server
          setTimeout(() => fetchMessages(), 500)
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

    eventListenersSet.current = true

    // Cleanup function
    return () => {
      if (rtm) {
        rtm.removeEventListener("message", handleMessage)
        rtm.removeEventListener("presence", handlePresence)
        rtm.removeEventListener("status", handleStatus)
      }
    }
  }, [rtm, channelName, user.userId])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Add a small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)

    return () => clearTimeout(timer)
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((!newMessage.trim() && !replyingTo) || isLoading) return
    if (!rtm) return

    // Store message text before clearing input for better UX
    const messageText = newMessage.trim()

    // Clear input immediately for responsive feel
    setNewMessage("")

    // Create a temporary message ID
    const tempId = `${user.userId}_${Date.now()}`

    // Add optimistic message to UI immediately
    const optimisticMsg: Message = {
      id: tempId,
      text: messageText,
      sender: user.name,
      type: "text",
      timestamp: new Date(),
      isCurrentUser: true,
      reactions: [],
      replyTo: replyingTo?.text || null,
      replyToSender: replyingTo?.sender || null,
    }

    // Add to messages immediately for instant feedback
    setMessages((prev) => [...prev, optimisticMsg])

    // Reset reply state
    setReplyingTo(null)
    if (inputRef.current) {
      inputRef.current.textContent = ""
    }

    try {
      // Prepare message data
      const messageData: any = {
        text: messageText,
        timestamp: Date.now(),
        type: "text",
      }

      // Add reply information if replying to a message
      if (replyingTo) {
        messageData.replyTo = replyingTo.text
        messageData.replyToSender = replyingTo.sender
      }

      // Prepare database message data
      const dbMessageData: MessageInput = {
        text: messageText,
        sender: user.name,
        isCurrentUser: true,
        type: "text",
        replyTo: replyingTo?.text || null,
        replyToSender: replyingTo?.sender || null,
        replyToId: replyingTo?.id || null,
        reactions: [], // Initialize empty reactions array
        file: messageData.file || null, // Include file if present
      }

      // Save to database
      const res = await createMessage(dbMessageData)
      console.log("Message saved to database:", res)

      // Publish message to Agora RTM channel
      await publishMessage(rtm, channelName, res)

      // Update the optimistic message with the real ID from the database
      if (res && res.id) {
        setMessages((prev) => prev.map((msg) => (msg.id === tempId ? { ...msg, id: res.id } : msg)))
      }
    } catch (error) {
      console.error("Failed to send message:", error)

      // Show error to user
      // You could add a toast notification here

      // Remove the optimistic message on failure
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId))

      // Restore the message text to the input
      setNewMessage(messageText)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!rtm) return

    // Create a temporary ID for optimistic UI update
    const tempId = `file_${user.userId}_${Date.now()}`

    // Create a temporary URL for the file
    const tempUrl = URL.createObjectURL(file)

    // Add optimistic message to UI immediately
    const optimisticMsg: Message = {
      id: tempId,
      text: `Sent a file: ${file.name}`,
      sender: user.name,
      type: "text",
      timestamp: new Date(),
      isCurrentUser: true,
      reactions: [],
      file: {
        name: file.name,
        url: tempUrl,
        type: file.type,
      },
    }

    // Add to messages immediately for instant feedback
    setMessages((prev) => [...prev, optimisticMsg])

    try {
      // In a real app, you would upload the file to a storage service here
      // For example: const uploadedUrl = await uploadToStorage(file)

      // For this demo, we'll use the temporary URL
      const fileUrl = tempUrl

      // Prepare message data
      const messageData = {
        text: `Sent a file: ${file.name}`,
        timestamp: Date.now(),
        type: "text",
        file: {
          name: file.name,
          url: fileUrl,
          type: file.type,
        },
      }

      // Prepare database message data
      const dbMessageData: MessageInput = {
        text: `Sent a file: ${file.name}`,
        sender: user.name,
        reactions: [],
        type: "text",
        isCurrentUser: true,
        file: {
          name: file.name,
          url: fileUrl,
        },
      }

      // Save to database
      const res = await createMessage(dbMessageData)
      console.log("File message saved to database:", res)

      // Publish message to Agora RTM channel
      await publishMessage(rtm, channelName, res)

      // Update the optimistic message with the real ID from the database
      if (res && res.id) {
        setMessages((prev) => prev.map((msg) => (msg.id === tempId ? { ...msg, id: res.id } : msg)))
      }
    } catch (error) {
      console.error("Failed to upload file:", error)

      // Show error to user
      // You could add a toast notification here

      // Remove the optimistic message on failure
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId))

      // Revoke the temporary URL to avoid memory leaks
      URL.revokeObjectURL(tempUrl)
    }
  }

  const addReaction = async (messageId: string, emoji: string) => {
    if (!rtm) return

    try {
      // Update local state first for immediate feedback
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, sender: user.name }],
            }
          }
          return msg
        }),
      )

      // Send reaction to channel for real-time updates
      const reactionData = {
        type: "reaction",
        data: {
          messageId,
          emoji,
          sender: user.name,
          timestamp: Date.now(),
        },
      }

      // Publish reaction to Agora RTM channel
      await publishMessage(rtm, channelName, reactionData)

      // Save reaction to database
      try {
        await saveReactionToDatabase(messageId, emoji, user.name)
      } catch (err) {
        console.error("Failed to save reaction to database:", err)
      }
    } catch (error) {
      console.error("Failed to add reaction:", error)
    }
  }

  // Add this function to handle saving reactions to the database
  const saveReactionToDatabase = async (messageId: string, emoji: string, sender: string) => {
    // This is a placeholder - implement the actual database save in your actions.ts
    console.log("Would save reaction to database:", { messageId, emoji, sender })
    await sendReaction(messageId, emoji, sender)
  }

  const formatTime = (timestamp: Date) => {
    // If timestamp is already a Date object, use it directly
    const date =
      timestamp instanceof Date ? timestamp : typeof timestamp === "string" ? new Date(timestamp) : new Date(timestamp)

    // Return formatted time (hours:minutes)
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white text-center p-6 bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-indigo-500/50 animate-spin"></div>
            <div
              className="absolute inset-3 rounded-full border border-transparent border-b-purple-500/70 animate-spin"
              style={{ animationDuration: "1.5s" }}
            ></div>
            <div className="absolute inset-0 -z-10 blur-md rounded-full bg-indigo-500/20"></div>
          </div>
          <p className="text-lg font-light">Loading messages...</p>
          <p className="text-xs text-indigo-300 mt-2">Connecting to chat server</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full p-4 text-white">
      <AnimatePresence>
        {isAITyping && (
          <motion.div
            className="mt-1 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <motion.div
                className="w-1 h-2 bg-purple-400 rounded-full"
                animate={{ height: [2, 6, 2] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
              />
              <motion.div
                className="w-1 h-2 bg-purple-400 rounded-full"
                animate={{ height: [2, 8, 2] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
              />
              <motion.div
                className="w-1 h-2 bg-purple-400 rounded-full"
                animate={{ height: [2, 4, 2] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
              />
            </div>
            <span className="text-xs text-purple-300">Recording...</span>
          </motion.div>
        )}
      </AnimatePresence>
      {replyingTo && (
        <div className="mb-4 p-3 bg-indigo-800/50 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Reply className="h-4 w-4 text-indigo-300" />
            <span className="text-sm text-indigo-300">Replying to {replyingTo.sender}</span>
            <span className="text-sm text-white/70 truncate max-w-[200px]">{replyingTo.text}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-white/10"
            onClick={() => setReplyingTo(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      <div
        className="flex-1 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        style={{
          height: "calc(100vh - 220px)", // More responsive height calculation
          maxHeight: "calc(100vh - 220px)",
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(45,55,72,0.05) 100%)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
           className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 mb-4 rounded-full bg-indigo-900/30 flex items-center justify-center">
                <Send className="h-6 w-6 text-indigo-300" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No messages yet</h3>
              <p className="text-center text-sm text-indigo-300 max-w-xs">
                Be the first to start the conversation! Send a message to begin chatting.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex gap-2 group">
                    {!message.isCurrentUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-xs shadow-lg">
                          {getInitials(message.sender)}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex flex-col">
                      {/* Sender name above message for current user */}
                      {message.isCurrentUser && (
                        <div className="text-right font-medium text-xs mb-1 text-indigo-300/80 pr-1">
                          {message.sender}
                        </div>
                      )}

                      <div
                        className={`p-3.5 relative ${
                          message.isCurrentUser
                            ? "bg-gradient-to-br from-indigo-900/90 to-purple-900/90 text-white shadow-lg shadow-indigo-900/20"
                            : "bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-white shadow-lg shadow-black/20"
                        }`}
                        style={{
                          borderRadius: message.isCurrentUser ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
                          clipPath: message.isCurrentUser
                            ? "polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%)"
                            : "polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 85%)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        {/* Glowing border effect */}
                        <div
                          className="absolute inset-0 -z-10 opacity-50 blur-sm"
                          style={{
                            background: message.isCurrentUser
                              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))"
                              : "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(99, 102, 241, 0.2))",
                            borderRadius: message.isCurrentUser ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
                          }}
                        ></div>

                        {/* Sender name inside message for non-current user */}
                        {!message.isCurrentUser && (
                          <div className="font-semibold text-sm mb-1.5 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                            {message.sender}
                          </div>
                        )}

                        {message.replyTo && (
                          <div
                            className="mb-2.5 p-2.5 rounded text-sm text-indigo-100 border-l-2 border-indigo-400"
                            style={{
                              background: "rgba(79, 70, 229, 0.2)",
                              backdropFilter: "blur(4px)",
                              borderRadius: "0.5rem 1rem 1rem 0.5rem",
                            }}
                          >
                            <div className="font-semibold text-xs text-indigo-300">{message.replyToSender}</div>
                            <div className="truncate">{message.replyTo}</div>
                          </div>
                        )}

                        <p className="leading-relaxed text-xs break-words whitespace-pre-wrap max-w-[300px]">
                          {message.text}
                        </p>

                        {message.file && (
                          <div
                            className="mt-2.5 p-2.5 flex items-center gap-2 rounded-lg"
                            style={{
                              background: "rgba(79, 70, 229, 0.15)",
                              backdropFilter: "blur(4px)",
                              border: "1px solid rgba(99, 102, 241, 0.2)",
                            }}
                          >
                            <ImageIcon className="h-4 w-4 text-indigo-300" />
                            <a
                              href={message.file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-300 hover:text-white text-sm underline transition-colors"
                            >
                              {message.file.name}
                            </a>
                          </div>
                        )}

                        <div
                          className={`text-xs mt-1.5 ${message.isCurrentUser ? "text-indigo-300/70" : "text-indigo-300/70"}`}
                        >
                          {formatTime(message.timestamp)}
                        </div>

                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="absolute -bottom-2 left-0 flex gap-1 "
                        >
                          {message.reactions.length > 0 && (
                            <div
                              className="px-2.5 py-1 rounded-full text-xs z-50 flex items-center gap-1 shadow-lg"
                              style={{
                                background: "linear-gradient(135deg, rgba(79, 70, 229, 0.7), rgba(124, 58, 237, 0.7))",
                                backdropFilter: "blur(4px)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                              }}
                            >
                              {Array.from(new Set(message.reactions.map((r) => r.emoji))).map((emoji) => (
                                <span key={emoji}>{emoji}</span>
                              ))}
                              <span className="text-indigo-200 ml-1">{message.reactions.length}</span>
                            </div>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute right-0 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                        >
                          <div className="flex flex-col gap-1.5">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6 rounded-full backdrop-blur-sm hover:bg-indigo-500 transition-all duration-200"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(79, 70, 229, 0.7), rgba(124, 58, 237, 0.7))",
                                      border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                    onClick={() => setReplyingTo(message)}
                                  >
                                    <Reply className="h-3 w-3 text-white" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                  <p className="text-xs">Reply</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6 rounded-full backdrop-blur-sm hover:bg-indigo-500 transition-all duration-200"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(79, 70, 229, 0.7), rgba(124, 58, 237, 0.7))",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                  }}
                                >
                                  <Smile className="h-3 w-3 text-white" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 border-indigo-700 bg-indigo-900/90 backdrop-blur-xl shadow-xl"
                                side="left"
                              >
                                <Picker onEmojiSelect={(emoji: any) => addReaction(message.id, emoji.native)} />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {message.isCurrentUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-xs shadow-lg">
                          {getInitials(message.sender)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        <div  ref={scrollRef as any} />
      </div>

      <div className="border-t border-white/10 bg-black/30 backdrop-blur-md pt-4 pb-4">
        <form onSubmit={sendMessage} className="flex flex-col gap-4 px-4">
          <div className="relative">
            {/* Glowing background effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-md"></div>

            {/* Textarea with improved styling */}
            <textarea
              className="relative min-h-[80px] max-h-[120px] w-full rounded-xl bg-gray-900/50 backdrop-blur-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 overflow-y-auto border border-white/10 resize-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage(e)
                }
              }}
            />

            {/* Input actions with improved positioning */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-indigo-500/30 bg-black/30 backdrop-blur-sm border border-white/10 transition-colors"
                  >
                    <Smile className="h-4 w-4 text-indigo-300" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 border-white/10 bg-black/90 backdrop-blur-xl shadow-xl"
                  side="top"
                  align="end"
                >
                  <Picker
                    onEmojiSelect={(emoji: any) => {
                      setNewMessage((prev) => prev + emoji.native)
                      setIsEmojiOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-indigo-500/30 bg-black/30 backdrop-blur-sm border border-white/10 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-4 w-4 text-indigo-300" />
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleFileUpload(file)
                    // Reset the input value so the same file can be selected again
                    e.target.value = ""
                  }
                }}
              />
            </div>
          </div>

          {/* Bottom controls with better alignment */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VoiceRecorder inputRef={inputRef} setIsAITyping={setIsAITyping} setNewMessage={setNewMessage} />

              {/* Status indicator with better styling */}
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-xs text-indigo-300 font-medium">FUSION</p>
              </div>
            </div>

            <Button
              type="submit"
              className="rounded-full px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border border-white/10 shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:scale-105"
              disabled={!newMessage.trim() && !isAITyping}
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
