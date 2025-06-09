"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Picker from "@emoji-mart/react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Smile,
    Send,
    PlusCircle,
    ImageIcon,
    Paperclip,
    Users,
    MessageSquare,
    Sparkles,
    Heart,
    ThumbsUp,
    Laugh,
    Frown,
    X,
    Shield,
    Wand2,
 
} from "lucide-react"
import data from "@emoji-mart/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getOrCreateUserId } from "@/lib/userGn"
import crypto from "crypto";
import { ChatMessage } from "@/lib/initAgoraClient"
import { ScrollArea } from "../ui/scroll-area"
import { format } from "date-fns"


interface PrivateChatProps {
  isOpen: boolean
  onClose: () => void
  recipientId: string
  recipientName: string
  recipientAvatar?: string
  meetingContext?: {
    topic: string
    duration: number
    participants: number
    agenda?: string[]
  }
}

const currentUser = {
  id: getOrCreateUserId(),
  name: getOrCreateUserId().split('-')[4],
  avatar: `/placeholder.svg?height=32&width=32`,
}
function generateShortChannelName(user1: string, user2: string): string {
    const sortedIds = [user1, user2].sort().join("-");
    const hash = crypto.createHash("sha256").update(sortedIds).digest("hex");
    return `chat-${hash.substring(0, 12)}`; // Take first 12 chars for uniqueness
  }
  
export default function SingleChat({
    isOpen,
    onClose,
    recipientId,
    recipientName,
    recipientAvatar,
  }: PrivateChatProps) {

    const [newMessage, setNewMessage] = useState<string>()
    const [isTyping, setIsTyping] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [theme, setTheme] = useState<"default" | "dark" | "light" | "contrast">("default")
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [activeMessage, setActiveMessage] = useState<string | null>(null)
  const [messageReactions, setMessageReactions] = useState<Record<string, string[]>>({})
  const [messageParticles, setMessageParticles] = useState<Record<string, boolean>>({})
  const [isAITyping, setIsAITyping] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

    const { sendMessage, sendTypingIndicator,messageList, onlineUsers, typingUsers, isConnected } = useAgoraChat(
        process.env.NEXT_PUBLIC_AGORA_APP_ID!,
        currentUser,
        generateShortChannelName(currentUser.id, recipientId),
      )

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSendMessage = async (e?: React.FormEvent, aiGenerated = false) => {
    e?.preventDefault()

    // Create new message
    const messageData: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      recipientId,
      recipientName,
      recipientAvatar,
      channel: generateShortChannelName(currentUser.id, recipientId),
      content: newMessage?.trim() as string,
      timestamp: new Date(),
      status: "sending",
      type: aiGenerated ? "ai" : "text",
      reactions: [],
      aiGenerated,
    }

    sendMessage(messageData)
    setNewMessage("")

    // Add to messages
    setNewMessage(undefined)

    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      setIsTyping(false)
    }

 
  }

  const handleFileUpload = async (file: File) => {
    const isImage = file.type.startsWith("image/")
    const fileUrl = URL.createObjectURL(file)
    const msgId = Date.now().toString()

    const messageData: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      channel: generateShortChannelName(currentUser.id, recipientId),
      content: newMessage?.trim() as string,
      timestamp: new Date(),
      status: "sending",
      type: "img",
      reactions: [],
    }

    await sendMessage(messageData)

    // Add message particle effect
    setMessageParticles((prev) => ({
      ...prev,
      [msgId]: true,
    }))

    // Remove particles after animation
    setTimeout(() => {
      setMessageParticles((prev) => {
        const updated = { ...prev }
        delete updated[msgId]
        return updated
      })
    }, 2000)
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    for (const item of items) {
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile()
        if (file) {
          e.preventDefault()
          handleFileUpload(file)
        }
      }
    }
  }

  const toggleReactions = (messageId: string) => {
    setActiveMessage(activeMessage === messageId ? null : messageId)
    setShowReactions(activeMessage !== messageId)
  }

  const addReaction = (messageId: string, reaction: string) => {
    setMessageReactions((prev) => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), reaction],
    }))
    setActiveMessage(null)
    setShowReactions(false)
  }


  const renderMessage = (message: ChatMessage) => {
    if (message.type === "text") {
      return message.content
    }
    if (message.type === "img") {
      return (
        <div className="relative">
          <img
            src={message.content|| "/placeholder.svg"}
            alt={message.content}
            className="max-w-[240px] rounded-lg border border-white/10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-2">
            <span className="text-xs text-white">{message.content}</span>
          </div>
        </div>
      )
    }
    if (message.type ==="pdf") {
      return (
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2 border border-white/10">
          <Paperclip className="h-4 w-4 text-indigo-300" />
          <span>{message.content}</span>
        </div>
      )
    }
  }

  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return {
          bg: "bg-gray-950",
          gradient: "bg-gradient-to-br from-gray-900 via-gray-950 to-black",
          text: "text-white",
          border: "border-gray-800",
          accent: "bg-gray-800",
        }
      case "light":
        return {
          bg: "bg-white/90",
          gradient: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
          text: "text-gray-900",
          border: "border-gray-200",
          accent: "bg-gray-100",
        }
      case "contrast":
        return {
          bg: "bg-black",
          gradient: "bg-black",
          text: "text-white",
          border: "border-yellow-500",
          accent: "bg-yellow-500",
        }
      default:
        return {
          bg: "bg-black/60",
          gradient: "bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-black/20",
          text: "text-white",
          border: "border-white/10",
          accent: "bg-white/5",
        }
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <motion.div
    ref={chatContainerRef}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className={cn(
      "absolute inset-x-0 top-0 right-0 bottom-0 left-0 md:left-auto flex items-center gap-2 bg-white/5 border border-white/10 flex-col z-20 overflow-hidden w-96 md:w-[420px]",
    )} >

<div className={cn("absolute inset-0 backdrop-blur-md", themeClasses.bg)}></div>
  <div className={cn("absolute inset-0", themeClasses.gradient)}></div>
  <div className={cn("absolute inset-0 border-l", themeClasses.border)}></div>

  {/* Animated background elements */}
  <div className="absolute -top-40 -left-20 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-40 -right-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

  <motion.div
  className={cn("px-2 sm:px-4 py-2 sm:py-3 border-b w-full border-white/10 bg-black/30 backdrop-blur-md", themeClasses.border)}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-sm animate-pulse"></div>
        <div className="relative bg-black rounded-full p-1 sm:p-1.5">
          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
      </div>
      <h2 className="text-xs sm:text-sm font-medium text-white">{recipientName}</h2>
    </div>

    <div className="flex items-center gap-1.5 sm:gap-3">
      <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-400 bg-black/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-white/5">
        <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-indigo-300" />
        <span className="hidden xs:inline">{onlineUsers.size} online</span>
        <span className="xs:hidden">{onlineUsers.size}</span>
        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-red-500"} animate-pulse`} />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-white/5"
        onClick={onClose}
      >
        <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
      </Button>
    </div>
  </div>

  {/* Typing indicator with particle effect */}
  <AnimatePresence>
    {typingUsers.size > 0 && (
      <motion.div
        className="mt-1 flex items-center gap-1 sm:gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="flex items-center space-x-0.5 sm:space-x-1">
          <motion.div
            className="w-0.5 sm:w-1 h-2 bg-indigo-400 rounded-full"
            animate={{ height: [2, 6, 2] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          />
          <motion.div
            className="w-0.5 sm:w-1 h-2 bg-indigo-400 rounded-full"
            animate={{ height: [2, 8, 2] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="w-0.5 sm:w-1 h-2 bg-indigo-400 rounded-full"
            animate={{ height: [2, 4, 2] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
          />
        </div>
        <span className="text-[10px] sm:text-xs text-indigo-300 truncate">
          <span className="hidden sm:inline">{Array.from(typingUsers).join(", ")} {typingUsers.size === 1 ? "is" : "are"} typing...</span>
          <span className="sm:hidden">Typing...</span>
        </span>
      </motion.div>
    )}
  </AnimatePresence>

  {/* AI typing indicator */}
  <AnimatePresence>
    {isAITyping && (
      <motion.div
        className="mt-1 flex items-center gap-1 sm:gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="flex items-center space-x-0.5 sm:space-x-1">
          <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-400" />
          <motion.div
            className="w-0.5 sm:w-1 h-2 bg-purple-400 rounded-full"
            animate={{ height: [2, 6, 2] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          />
          <motion.div
            className="w-0.5 sm:w-1 h-2 bg-purple-400 rounded-full"
            animate={{ height: [2, 8, 2] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="w-0.5 sm:w-1 h-2 bg-purple-400 rounded-full"
            animate={{ height: [2, 4, 2] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
          />
        </div>
        <span className="text-[10px] sm:text-xs text-purple-300 truncate">
          <span className="hidden sm:inline">AI Assistant is analyzing the conversation...</span>
          <span className="sm:hidden">AI analyzing...</span>
        </span>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>

  {/* MessagelmessageList area with dimensional scrolling effect */}
  <ScrollArea
    ref={scrollRef as any}
    className="flex-1 w-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
    style={{
      height: "calc(600px - 60px - 180px)",
      background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(45,55,72,0.05) 100%)",
    }}
  >
    <div className="space-y-6 py-6 px-4">
      {messageList.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`relative flex items-start gap-3 ${
            message.senderId === currentUser.id ? "flex-row-reverse" : ""
          }`}
        >
          {/* Avatar with dimensional effect */}
          <div className="relative">
            {message.aiGenerated ? (
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-70 blur-sm animate-pulse"></div>
            ) : message.senderId === currentUser.id ? (
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-sm"></div>
            ) : (
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-70 blur-sm"></div>
            )}
            <Avatar className="h-8 w-8 border border-white/10 relative">
              {message.aiGenerated ? (
                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-purple-300" />
                </div>
              ) : (
                <>
                  <AvatarImage src={`https://avatar.vercel.sh/${message.senderName}`} />
                  <AvatarFallback className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                    {message.senderName[0]}
                  </AvatarFallback>
                </>
              )}
            </Avatar>

            {/* Online indicator */}
            {onlineUsers.has(message.senderId) && message.senderId !== "system" && (
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black"></span>
            )}

            {/* AI badge */}
            {message.aiGenerated && (
              <div className="absolute -bottom-1 -right-1 bg-purple-900/80 rounded-full p-0.5 border border-purple-500/50">
                <Shield className="h-2 w-2 text-purple-300" />
              </div>
            )}
          </div>

          {/* Message content with dimensional effect */}
          <div
            className={`group relative flex flex-col space-y-1 max-w-[80%] ${
              message.senderId === currentUser.id ? "items-end" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-xs ${message.aiGenerated ? "text-purple-300" : "text-gray-400"} font-medium`}>
                {message.senderName}
              </span>
              <span className="text-xs text-gray-500">{format(message.timestamp, "HH:mm")}</span>
            </div>

            {/* Message bubble with dimensional effect */}
            <div
              className={cn(
                "relative rounded-2xl px-4 py-2.5 text-sm",
                message.senderId === currentUser.id
                  ? "bg-gradient-to-br from-indigo-600/80 to-purple-700/80 text-white backdrop-blur-md border border-indigo-500/30"
                  : message.aiGenerated
                    ? "bg-gradient-to-br from-purple-900/80 to-indigo-900/80 text-white backdrop-blur-md border border-purple-500/30"
                    : "bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-white backdrop-blur-md border border-gray-700/30",
              )}
            >
              {renderMessage(message)}

              {/* Particle effects for new messageList */}
              {messageParticles[message.id] && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white"
                      initial={{
                        x: "50%",
                        y: "50%",
                        opacity: 1,
                      }}
                      animate={{
                        x: `${50 + (Math.random() * 100 - 50)}%`,
                        y: `${50 + (Math.random() * 100 - 50)}%`,
                        opacity: 0,
                      }}
                      transition={{ duration: 1 + Math.random() }}
                    />
                  ))}
                </div>
              )}

              {/* Special effects for AI messageList */}
              {message.aiGenerated && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 animate-pulse"></div>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-20 h-20 rounded-full bg-purple-500/5"
                      initial={{
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        scale: 0,
                      }}
                      animate={{
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 1,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Message reactions */}
            {messageReactions[message.id] && messageReactions[message.id].length > 0 && (
              <div className="flex items-center gap-1 mt-1">
                {messageReactions[message.id].map((reaction, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-black/40 backdrop-blur-sm rounded-full px-1.5 py-0.5 border border-white/10"
                  >
                    <span className="text-xs">{reaction}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Reaction button */}
            <div
              className={`absolute ${message.senderId === currentUser.id ? "left-0 -translate-x-full" : "right-0 translate-x-full"} top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60"
                onClick={() => toggleReactions(message.id)}
              >
                <Heart className="h-3 w-3 text-pink-400" />
              </Button>

              {/* Reaction picker */}
              {activeMessage === message.id && showReactions && (
                <div
                  className={`absolute ${message.senderId === currentUser.id ? "left-0" : "right-0"} top-0 mt-8 z-10`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/10"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10"
                      onClick={() => addReaction(message.id, "❤️")}
                    >
                      <Heart className="h-4 w-4 text-pink-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10"
                      onClick={() => addReaction(message.id, "👍")}
                    >
                      <ThumbsUp className="h-4 w-4 text-blue-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10"
                      onClick={() => addReaction(message.id, "😂")}
                    >
                      <Laugh className="h-4 w-4 text-yellow-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10"
                      onClick={() => addReaction(message.id, "😢")}
                    >
                      <Frown className="h-4 w-4 text-gray-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10"
                      onClick={() => addReaction(message.id, "✨")}
                    >
                      <Sparkles className="h-4 w-4 text-purple-400" />
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </ScrollArea>

  {/* Input area with dimensional effect */}
  <div className="p-4 border-t w-full border-white/10 bg-black/30 backdrop-blur-md">
    <form onSubmit={handleSendMessage} className="flex flex-col gap-4">

      <div className="relative" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
        {/* Input field with dimensional effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-md"></div>
        <div
          ref={inputRef}
          contentEditable
          className="relative min-h-[80px] max-h-[80px] w-full rounded-xl bg-gray-900/50 backdrop-blur-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 overflow-y-auto border border-white/10"
          onInput={(e) => {
            setNewMessage(e.currentTarget.textContent || "")
            sendTypingIndicator()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage(e)
            }
          }}
          onPaste={handlePaste}
        />

        {/* Input actions */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <Popover open={isEmojiOpen} onOpenChange={setIsEmojiOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-white/10 bg-black/30 backdrop-blur-sm border border-white/10"
              >
                <Smile className="h-4 w-4 text-indigo-300" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 border-white/10 bg-black/80 backdrop-blur-xl"
              side="top"
              align="end"
            >
              <Picker
                data={data}
                onEmojiSelect={(emoji: any) => {
                  if (inputRef.current) {
                    inputRef.current.textContent += emoji.native
                    setNewMessage((prev) => prev + emoji.native)
                  }
                  setIsEmojiOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-white/10 bg-black/30 backdrop-blur-sm border border-white/10"
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
              }
            }}
          />
        </div>

        {/* AI suggestion button */}
        <div className="absolute -top-10 right-3">
          <Button
            type="button"
            size="sm"
            className="h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border border-white/10 shadow-lg shadow-purple-500/20"
            onClick={() => {
              setIsAITyping(true)
            }}
          >
            <Wand2 className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs">AI Suggestions</span>
          </Button>
        </div>
      </div>

      {/* Send button with dimensional effect */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50"
        >
          <PlusCircle className="h-5 w-5 text-indigo-300" />
        </Button>

        <Button
          type="submit"
          className="rounded-full px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border border-white/10 shadow-lg shadow-indigo-500/20"
          disabled={!newMessage?.trim()}
        >
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </form>
  </div>
      
    </motion.div>
  )
}
