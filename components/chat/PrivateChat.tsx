"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Send,
  X,
  Mic,
  Check,
  CheckCheck,
  Clock,
  Globe,
  Sparkles,
  Zap,
  Lock,
  Loader2,
  MessageCircle,
  Wand2,
  BrainCircuit,
  Waves,
  Volume2,
  Lightbulb,
  Maximize,
  Minimize,
  ChevronDown,
  ChevronUp,
  Crown,
  Star,
  Bookmark,
  Trash2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useAgoraChat } from "@/hook/useAgoraChat"
import { getOrCreateUserId } from "@/lib/userGn"
import crypto from "crypto";
import { ChatMessage } from "@/lib/initAgoraClient"
import { SessionPayload } from "@/lib/session"


interface PrivateChatProps {
  isOpen: boolean
  onClose: () => void
  recipientId: string
  user:SessionPayload
  recipientName: string
  recipientAvatar?: string
  meetingContext?: {
    topic: string
    duration: number
    participants: number
    agenda?: string[]
  }
}

export function PrivateChat({
  isOpen,
  onClose,
  recipientId,
  user,
  recipientName,
  recipientAvatar,
}: PrivateChatProps) {
  // State
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>()
  const [isTyping, setIsTyping] = useState(false)
  const [recipientIsTyping, setRecipientIsTyping] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [theme, setTheme] = useState<"default" | "dark" | "light" | "contrast">("default")
  const [isScrolledUp, setIsScrolledUp] = useState(false)
  const [newMessagesAlert, setNewMessagesAlert] = useState(false)
  const [spatialAudio, setSpatialAudio] = useState(false)
  const [isPremiumVisible, setIsPremiumVisible] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [contextAwareness, setContextAwareness] = useState(true)
  const [ephemeralMode, setEphemeralMode] = useState(false)
  

function generateShortChannelName(user1: string, user2: string): string {
  const sortedIds = [user1, user2].sort().join("-");
  const hash = crypto.createHash("sha256").update(sortedIds).digest("hex");
  return `chat-${hash.substring(0, 12)}`; // Take first 12 chars for uniqueness
}


  const { sendMessage, sendTypingIndicator,messageList, onlineUsers, typingUsers, isConnected } = useAgoraChat(
    process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    user,
    generateShortChannelName(user.id, recipientId),
  )

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (isOpen) {
      setMessages((prev) => [...prev, ...messageList]);
    }
  }, [isOpen, user, isConnected, messageList, sendMessage])

  const sendMessages = async (e?: React.FormEvent, aiGenerated = false) => {
    e?.preventDefault()

    // Create new message
    const messageData: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      recipientId,
      recipientName,
      recipientAvatar,
      channel: generateShortChannelName(user.id, recipientId),
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
    setAiSuggestions([])

    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      setIsTyping(false)
    }

    // Send message via RTM
    let success = false

  
    // Update message status
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage ? { ...msg, status: success ? "sent" : "failed" } : msg)),
      )

      if (success) {
        // Simulate delivery and read receipts
        setTimeout(() => {
          setMessages((prev) => prev.map((msg) => (msg.id === newMessage ? { ...msg, status: "delivered" } : msg)))

          setTimeout(() => {
            setMessages((prev) => prev.map((msg) => (msg.id === newMessage ? { ...msg, status: "read" } : msg)))
          }, 3000)
        }, 1000)
      }
    }, 500)

 
  }
 
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && !isScrolledUp) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    } else if (isScrolledUp && messages.length > 0 && messages[messages.length - 1].senderId !== user.id) {
      setNewMessagesAlert(true)
    }
  }, [messages, isScrolledUp, user])

  // Handle scroll events
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
      setIsScrolledUp(!isAtBottom)

      if (isAtBottom) {
        setNewMessagesAlert(false)
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Ephemeral message cleanup
  useEffect(() => {
    if (ephemeralMode) {
      const interval = setInterval(() => {
        const now = new Date()
        setMessages((prev) =>
          prev.filter((msg) => {
            const msgAge = (now.getTime() - msg.timestamp.getTime()) / 1000
            return msgAge < ephemeralTimeout
          }),
        )
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [ephemeralMode, ephemeralTimeout])

  const addReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          // Check if user already reacted with this emoji
          const existingReaction = msg.reactions?.find((r) => r.userId === user.id && r.emoji === emoji)

          if (existingReaction) {
            // Remove reaction if it exists
            return {
              ...msg,
              reactions: msg.reactions?.filter((r) => !(r.userId === user.id && r.emoji === emoji)),
            }
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...(msg.reactions || []), { emoji, userId: user.id }],
            }
          }
        }
        return msg
      }),
    )
  }

  const deleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    setNewMessagesAlert(false)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleSpatialAudio = () => {
    setSpatialAudio(!spatialAudio)

    // Initialize audio context if needed
    if (!spatialAudio && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (e) {
        console.error("Web Audio API is not supported in this browser")
      }
    }
  }

  const playSpatialNotification = (spatial: { x: number; y: number; z: number }) => {
    if (!audioContextRef.current) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()
      const panner = audioContextRef.current.createPanner()

      // Set up spatial position
      panner.positionX.value = spatial.x
      panner.positionY.value = spatial.y
      panner.positionZ.value = spatial.z

      // Connect nodes
      oscillator.connect(gainNode)
      gainNode.connect(panner)
      panner.connect(audioContextRef.current.destination)

      // Configure sound
      oscillator.type = "sine"
      oscillator.frequency.value = 440 + spatial.y * 100
      gainNode.gain.value = 0.1

      // Play brief tone
      oscillator.start()
      oscillator.stop(audioContextRef.current.currentTime + 0.2)
    } catch (e) {
      console.error("Error playing spatial audio:", e)
    }
  }

  const togglePremiumFeatures = () => {
    setIsPremiumVisible(!isPremiumVisible)
  }

  const toggleEphemeralMode = () => {
    setEphemeralMode(!ephemeralMode)
  }

  const toggleContextAwareness = () => {
    setContextAwareness(!contextAwareness)
  }

  // Helper functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" + secs : secs}`
  }

  const formatMessageTime = (date: Date | string | number) => {
    const validDate = new Date(date); // Ensure it's a Date object
    if (isNaN(validDate.getTime())) return "Invalid Date"; // Handle invalid dates
    return validDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getMessageStatusIcon = (status: ChatMessage["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-400" />
      case "failed":
        return <X className="h-3 w-3 text-red-400" />
      default:
        return null
    }
  }

  const getSentimentIcon = (sentiment?: ChatMessage["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return <span className="text-green-400">😊</span>
      case "negative":
        return <span className="text-red-400">😕</span>
      case "excited":
        return <span className="text-yellow-400">😃</span>
      case "curious":
        return <span className="text-blue-400">🤔</span>
      default:
        return null
    }
  }

  const analyzeSentiment = (text: string): ChatMessage["sentiment"] => {
    // This is a simple mock implementation
    // In a real app, you would use NLP or an AI service
    const positiveWords = ["great", "good", "excellent", "amazing", "perfect", "thanks", "love"]
    const negativeWords = ["bad", "poor", "terrible", "awful", "wrong", "issue", "problem"]
    const excitedWords = ["wow", "awesome", "incredible", "fantastic", "exciting", "yes"]
    const curiousWords = ["how", "what", "why", "when", "where", "?", "curious", "wonder"]

    const lowerText = text.toLowerCase()

    if (positiveWords.some((word) => lowerText.includes(word))) return "positive"
    if (negativeWords.some((word) => lowerText.includes(word))) return "negative"
    if (excitedWords.some((word) => lowerText.includes(word))) return "excited"
    if (curiousWords.some((word) => lowerText.includes(word))) return "curious"

    return "neutral"
  }

  const renderMessageContent = (message: ChatMessage) => {
    // Apply message effect if present
    const effectClass = message.effect ? getEffectClass(message.effect) : ""

    // Handle ephemeral message styling
    const ephemeralClass = ephemeralMode ? "animate-pulse" : ""

    // Base message container with effects
    const MessageContainer = ({ children }: { children: React.ReactNode }) => (
      <div className={cn("relative", effectClass, ephemeralClass)}>
        {children}

        {/* Show ephemeral countdown if applicable */}
        {ephemeralMode && (
          <div className="absolute -top-4 right-0 text-xs text-indigo-300">
            {Math.max(0, ephemeralTimeout - Math.floor((new Date().getTime() - message.timestamp.getTime()) / 1000))}s
          </div>
        )}

        {/* Show bookmark indicator if applicable */}
        {message.bookmarked && (
          <div className="absolute -top-2 -right-2">
            <Bookmark size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
        )}
      </div>
    )

    switch (message.type) {
      case "ai":
        return (
          <MessageContainer>
            <div className="flex items-start gap-2">
              <BrainCircuit size={16} className="text-indigo-400 mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="px-1.5 py-0 text-xs bg-indigo-950/50 text-indigo-300 border-indigo-800"
                  >
                    AI Insight
                  </Badge>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          </MessageContainer>
        )
      case "voice":
        return (
          <MessageContainer>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2 border border-white/10">
              <Waves className="h-4 w-4 text-indigo-300" />
              <div className="flex-1">
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
              <span className="text-xs text-white">{message.content.split("(")[1].split(")")[0]}</span>
              {message.sentiment && <span className="ml-1">{getSentimentIcon(message.sentiment)}</span>}
            </div>
          </MessageContainer>
        )
      case "context":
        return (
          <MessageContainer>
            <div className="space-y-1">
              <p>{message.content}</p>
              {message.contextData && (
                <div className="flex items-center gap-1 mt-1 p-2 rounded-md bg-indigo-950/30 border border-indigo-800/50">
                  <Lightbulb className="h-3.5 w-3.5 text-yellow-400" />
                  <div className="text-xs text-indigo-200">
                    <span className="font-medium">{message.contextData.type}: </span>
                    <span>{message.contextData.data.title || message.contextData.data.topic}</span>
                  </div>
                </div>
              )}
            </div>
          </MessageContainer>
        )
      case "spatial":
        return (
          <MessageContainer>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Volume2 size={14} className="text-blue-400" />
                <p>{message.content}</p>
              </div>
              {message.spatial && (
                <div className="mt-1 p-1.5 rounded-md bg-blue-950/30 border border-blue-800/50">
                  <div className="relative w-full h-8 bg-black/30 rounded-md overflow-hidden">
                    <div
                      className="absolute w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"
                      style={{
                        left: `${(message.spatial.x + 1) * 50}%`,
                        top: `${(message.spatial.y + 1) * 50}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </MessageContainer>
        )
      default:
        return (
          <MessageContainer>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <p>{message.content}</p>
                {message.sentiment && getSentimentIcon(message.sentiment)}
              </div>

              {message.translation && (
                <div className="flex items-center gap-1 mt-1">
                  <Globe className="h-3 w-3 text-indigo-300" />
                  <p className="text-xs text-indigo-300 italic">
                    {message.translation.text}
                    <span className="ml-1 text-indigo-400/70">({message.translation.language})</span>
                  </p>
                </div>
              )}
            </div>
          </MessageContainer>
        )
    }
  }

  const getEffectClass = (effect: ChatMessage["effect"]) => {
    switch (effect) {
      case "pulse":
        return "animate-pulse"
      case "glow":
        return "shadow-lg shadow-indigo-500/50"
      case "float":
        return "animate-bounce"
      case "sparkle":
        return "relative after:absolute after:inset-0 after:bg-white/20 after:animate-pulse"
      case "wave":
        return "animate-wiggle"
      case "3d":
        return "transform hover:rotate-y-12 transition-transform duration-300"
      default:
        return ""
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className={cn(
            "absolute top-0 right-0 bottom-0 flex flex-col z-20 overflow-hidden",
            isExpanded ? "w-96 md:w-[420px]" : "w-72 md:w-80",
          )}
        >
          {/* Layered background with glass effect */}
          <div className={cn("absolute inset-0 backdrop-blur-md", themeClasses.bg)}></div>
          <div className={cn("absolute inset-0", themeClasses.gradient)}></div>
          <div className={cn("absolute inset-0 border-l", themeClasses.border)}></div>

          {/* Animated background elements */}
          <div className="absolute -top-40 -left-20 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

          {/* Header with premium styling */}
          <div className={cn("relative p-3 border-b", themeClasses.border)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-60 blur-sm"></div>
                  <Avatar className="w-8 h-8 border border-white/20">
                    {recipientAvatar ? (
                      <AvatarImage src={recipientAvatar} alt={recipientName} />
                    ) : (
                      <AvatarFallback className="text-sm bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-medium">
                        {recipientName[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black bg-green-500"></span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("text-sm font-medium", themeClasses.text)}>{recipientName}</span>
                    <Badge
                      variant="outline"
                      className="h-4 px-1 py-0 text-[10px] bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                    >
                      <Crown size={8} className="mr-0.5" /> Premium
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    {recipientIsTyping ? (
                      <div className="flex items-center space-x-0.5">
                        <motion.div
                          className="w-1 h-1 bg-indigo-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                        />
                        <motion.div
                          className="w-1 h-1 bg-indigo-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-1 h-1 bg-indigo-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                        />
                        <span className="text-xs text-indigo-300 ml-1">typing...</span>
                      </div>
                    ) : (
                      <span className="text-xs text-indigo-300">
                        <Lock className="inline-block h-3 w-3 mr-1" />
                        Secure private chat
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={toggleExpanded}
                >
                  {isExpanded ? <Minimize size={14} /> : <Maximize size={14} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={onClose}
                >
                  <X size={14} />
                </Button>
              </div>
            </div>

            {/* Premium features bar */}
            {isPremiumVisible && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 overflow-hidden"
              >
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-6 w-6 rounded-full",
                        spatialAudio ? "bg-indigo-500/50 text-white" : "text-indigo-300 hover:bg-white/10",
                      )}
                      onClick={toggleSpatialAudio}
                      title="Spatial Audio"
                    >
                      <Volume2 size={12} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-6 w-6 rounded-full",
                        ephemeralMode ? "bg-indigo-500/50 text-white" : "text-indigo-300 hover:bg-white/10",
                      )}
                      onClick={toggleEphemeralMode}
                      title="Ephemeral Messages"
                    >
                      <Zap size={12} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-6 w-6 rounded-full",
                        contextAwareness ? "bg-indigo-500/50 text-white" : "text-indigo-300 hover:bg-white/10",
                      )}
                      onClick={toggleContextAwareness}
                      title="Context Awareness"
                    >
                      <BrainCircuit size={12} />
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-indigo-300 hover:text-white hover:bg-white/10 rounded-full"
                      onClick={togglePremiumFeatures}
                    >
                      {isPremiumVisible ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            className="relative flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/50 text-sm">
                <div className="relative">
                  <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-md"></div>
                  <MessageCircle size={28} className="relative text-indigo-300 mb-3" />
                </div>
                <p className="text-white/70 font-medium">Start a private conversation</p>
                <p className="text-xs text-indigo-300 mt-1">Messages are end-to-end encrypted</p>
              </div>
            ) : (
              messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "group relative",
                      message.senderId === user.id ? "ml-8" : message.senderId === "system" ? "mx-4" : "mr-8",
                      selectedMessage === message.id && "z-10",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-end gap-2",
                        message.senderId === user.id && "flex-row-reverse",
                        message.senderId === "system" && "justify-end",
                      )}
                    >
                      {/* Avatar (only show for recipient) */}
                      {message.senderId !== user.avatar && message.senderId !== "system" && (
                        <Avatar className="w-6 h-6 flex-shrink-0">
                          {recipientAvatar ? (
                            <AvatarImage src={recipientAvatar} alt={recipientName} />
                          ) : (
                            <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                              {recipientName[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      )}

                      {/* Message bubble */}
                      <div
                        className={cn(
                          "relative max-w-[85%] rounded-2xl px-3.5 py-2 text-sm shadow-lg",
                          message.senderId === user.avatar
                            ? "bg-gradient-to-br from-indigo-600/90 to-purple-700/90 text-white border border-indigo-500/30"
                            : message.senderId === "system"
                              ? "bg-gradient-to-br from-blue-900/70 to-indigo-900/70 text-white border border-blue-500/30"
                              : "bg-gradient-to-br from-gray-700/80 to-gray-800/80 text-white border border-white/10",
                        )}
                      >
                        {/* Subtle glow effect for sender's messages */}
                        {message.senderId === user.avatar && (
                          <div className="absolute -inset-0.5 bg-indigo-500/20 rounded-2xl blur-sm -z-10"></div>
                        )}

                        {/* AI message glow */}
                        {message.senderId === "system" && (
                          <div className="absolute -inset-0.5 bg-blue-500/20 rounded-2xl blur-sm -z-10"></div>
                        )}

                        {/* Message content */}
                        {renderMessageContent(message)}

                        {/* Message footer */}
                        <div
                          className={cn(
                            "flex items-center gap-1 mt-1 text-xs",
                            message.senderId === user.avatar ? "justify-end text-white/50" : "text-white/50",
                          )}
                        >
                          <span>{formatMessageTime(message.timestamp)}</span>
                          {message.senderId === user.avatar && getMessageStatusIcon(message.status)}
                          {message.priority === "high" && <span className="text-yellow-400">!</span>}
                          {message.priority === "urgent" && <span className="text-red-400">!!</span>}
                        </div>
                      </div>
                    </div>

                    {/* Message reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div
                        className={cn(
                          "flex mt-1",
                          message.senderId === user.avatar ? "justify-end mr-2" : "justify-start ml-8",
                        )}
                      >
                        <div className="flex items-center bg-white/10 rounded-full px-2 py-0.5">
                          {Array.from(new Set(message.reactions.map((r) => r.emoji))).map((emoji) => (
                            <div key={emoji} className="flex items-center">
                              <span className="text-xs mr-1">{emoji}</span>
                              <span className="text-xs text-white/50 mr-1">
                                {message.reactions?.filter((r) => r.emoji === emoji).length}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Message actions */}
                    <div
                      className={cn(
                        "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity",
                        message.senderId === user.avatar ? "left-0 -translate-x-full" : "right-0 translate-x-full",
                      )}
                    >
                      <div className="flex flex-col items-center gap-1 p-1 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full hover:bg-white/10"
                                onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
                              >
                                <Sparkles size={12} className="text-pink-400" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="bg-black/80 text-white border-none">
                              React
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {message.senderId === user.avatar && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 rounded-full hover:bg-white/10"
                                  onClick={() => deleteMessage(message.id)}
                                >
                                  <Trash2 size={12} className="text-red-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="left" className="bg-black/80 text-white border-none">
                                Delete
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>

                    {/* Reaction picker */}
                    <AnimatePresence>
                      {selectedMessage === message.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={cn(
                            "absolute z-20 mt-1",
                            message.senderId === user.avatar ? "-left-2" : "-right-2",
                          )}
                        >
                          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/10">
                            {["❤️", "👍", "🔥", "✨", "🎉", "👏"].map((emoji) => (
                              <Button
                                key={emoji}
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full hover:bg-white/10"
                                onClick={() => {
                                  addReaction(message.id, emoji)
                                  setSelectedMessage(null)
                                }}
                              >
                                <span className="text-sm">{emoji}</span>
                              </Button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
              ))
            )}
          </div>

          {/* AI suggestions */}
          <AnimatePresence>
            {aiSuggestions.length > 0 && contextAwareness && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative border-t border-indigo-500/20 bg-indigo-950/30 p-2"
              >
                <div className="flex items-center gap-1 mb-1.5">
                  <Wand2 size={12} className="text-indigo-400" />
                  <span className="text-xs text-indigo-300">AI Suggestions</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto py-1 px-2 text-xs bg-indigo-950/50 hover:bg-indigo-900/50 text-indigo-200 border-indigo-800/50"
                      onClick={() => {}}
                    >
                      {suggestion.length > 50 ? suggestion.substring(0, 47) + "..." : suggestion}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* New messages alert */}
          <AnimatePresence>
            {newMessagesAlert && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
              >
                <Button
                  size="sm"
                  onClick={scrollToBottom}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center gap-1 px-3 py-1 text-xs"
                >
                  <ChevronDown size={12} />
                  New messages
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI thinking indicator */}
          <AnimatePresence>
            {isAiThinking && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative border-t border-indigo-500/20 bg-indigo-950/30 p-2"
              >
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
                  <p className="text-xs text-indigo-300">AI analyzing conversation context...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input area with premium styling */}
          <form onSubmit={sendMessages} className="relative p-3 border-t border-white/10">
            {/* Subtle glow behind input */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-md"></div>

            <div className="relative flex items-center space-x-2">
              {/* Enhanced input with glass effect */}
              <div className="relative flex-1 overflow-hidden rounded-full">
                {/* Layered background for input */}

                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    ephemeralMode
                      ? `Ephemeral message (${ephemeralTimeout}s)`
                      : contextAwareness
                        ? "Smart message with context awareness..."
                        : "Type a message..."
                  }
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value)
                  }}
                  className="h-10 px-4 bg-transparent border-0 text-white placeholder:text-white/40 focus:ring-0 focus:outline-none"
                />
              </div>

              {/* AI assist button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex-shrink-0"
                onClick={() => {
                  setIsAiThinking(true)
                  setTimeout(() => {
                    const suggestions = [""]
                    setAiSuggestions(suggestions)
                    setIsAiThinking(false)
                  }, 1000)
                }}
              >
                <BrainCircuit size={16} className="text-indigo-300" />
              </Button>

              {/* Premium send button */}
              <Button
                type="submit"
                size="icon"
                className="relative h-10 w-10 rounded-full overflow-hidden shadow-lg flex-shrink-0"
                disabled={!newMessage?.trim()}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient"></div>

                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-sm animate-pulse"></div>

                {/* Button content */}
                <div className="relative flex items-center justify-center">
                  <Send size={16} className="text-white" />
                </div>
              </Button>
            </div>

            {/* Typing indicator */}
            {isTyping && <div className="absolute -bottom-5 left-4 text-xs text-indigo-300">You are typing...</div>}

            {/* Premium features indicator */}
            {!isPremiumVisible && (
              <div className="absolute -bottom-5 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 px-1.5 py-0 text-[10px] text-indigo-300 hover:text-white hover:bg-white/10 rounded-full"
                  onClick={togglePremiumFeatures}
                >
                  <Crown size={8} className="mr-0.5" /> Premium features <ChevronUp size={8} className="ml-0.5" />
                </Button>
              </div>
            )}
          </form>

          here the video streams are scrolling y axis. make it scrolll y axis on larger screen and x on smaller screens. decorate the webkits even sdd controls: <div className={cn("grid gap-4 xl:grid-cols-2 h-full")}>
                    <div className="h-full w-full overflow-y-auto space-y-1">
                    {remoteUsers
                     .filter(user => {
                      const uidStr = user.uid.toString();
                      return !uidStr.includes("*&$screen");
                    })
                      .map(remoteUser => {
                        const userName = remoteUser.uid.toString().split("-")[4]; // Extract user name
                        return (
                          <VideoStream
                            key={remoteUser.uid.toString()}
                            videoTrack={remoteUser.videoTrack}
                            audioTrack={remoteUser.audioTrack}
                            userId={remoteUser.uid.toString()}
                            appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
                            maximisedUser={maximizedParticipant}
                            isLocal={false}
                            reactions={reactions}
                            sendReaction ={sendReaction}
                            isVideoOff={false}
                            isHandRaised={raisedHands.has(remoteUser.uid.toString())}
                            userName={userName}
                            userAvatar={remoteUser.uid.toString()}
                            isMuted={!!remoteUser.audioTrack}
                            isSpeaking={false}
                            isMaximized={false}
                            onToggleMaximize={() => handleToggleMaximize(remoteUser.uid.toString())}
                            onMuteRemoteUser={() => handleMuteRemoteUser(remoteUser.uid.toString())}
                            className="h-full w-full"
                          />
                        );
                      })}
                 
                    </div>
                    <div className="h-full w-full overflow-y-auto space-x-1">
                    {remoteUsers
                      .filter(remoteUser => {
                        const uidStr = remoteUser.uid.toString();
                      return uidStr.includes("*&$screen");
                      })
                      .map(remoteUser => {
                        const uidParts = remoteUser.uid.toString().split("*&$");
                        const userName = uidParts[0].split("-")[4]; 

                        return (
                          <VideoStream
                            key={remoteUser.uid.toString()}
                            videoTrack={remoteUser.videoTrack}
                            audioTrack={remoteUser.audioTrack}
                            userId={remoteUser.uid.toString()}
                            maximisedUser={maximizedParticipant}
                            isLocal={false}
                            reactions={reactions}
                            sendReaction={sendReaction}
                            appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
                            isHandRaised={raisedHands.has(userId)}
                            isVideoOff={false}
                            userName={`${userName}-screen`}
                            isScreen = {true}
                            userAvatar={remoteUser.uid.toString()}
                            isMuted={!!remoteUser.audioTrack}
                            isSpeaking={false}
                            isMaximized={false}
                            onToggleMaximize={() => handleToggleMaximize(remoteUser.uid.toString())}
                            onMuteRemoteUser={() => handleMuteRemoteUser(remoteUser.uid.toString())}
                            className="h-full w-full"
                          />
                        );
                      })}
                    </div>
                 </div>
        </motion.div>
     
  )
}

