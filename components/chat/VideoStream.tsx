"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { Message, TranscriptionSettings } from "@/types/room"
import type { VideoStreamProps } from "@/types/video"
import { cn } from "@/lib/utils"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  MoreVertical,
  Pin,
  Volume2,
  VolumeX,
  Heart,
  Sparkles,
  Crown,
  Smile,
  MessageSquare,
  Send,
  X,
  Settings,
  Star,
  Zap,
  Loader2,
  Wifi,
  WifiOff,
  AlertTriangle,
  Hand,
  Badge,
} from "lucide-react"
import { SmilePlus, ThumbsUp, FlameIcon as Fire,  LucideIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VideoReactions } from "./VideoReactions"
import { getOrCreateUserId } from "@/lib/userGn"
import { ReactionMessage } from "@/lib/initAgoraClient"
import { ReactionDisplay } from "./ReactionsComponent"
import { VideoTranscriptionOverlay } from "../transcribe/TranscriptionView"

type ReactionEmoji = {
  icon: LucideIcon;
  color: string;
  label: string;
};



export function VideoStream({
  videoTrack,
  audioTrack,
  maximisedUser,
  userId,
  messages,
  isLocal,
  userName,
  settings,
  userAvatar,
  isMuted: initialMuted,
  isSpeaking,
  isMaximized,
  onToggleMaximize,
  onMuteRemoteUser,
  className,
  transcription,
  isScreen = false,
  isHandRaised,
}: VideoStreamProps & {
  className?: string
  transcription?:boolean
  appId:string
  messages?: Message[]
  settings?: TranscriptionSettings
  isVisible?: boolean
  audioTrack?: any
  isScreen?:boolean,
  onMuteRemoteUser?: () => void
  isHandRaised?: boolean
}) {
  const videoRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const [isMuted, setIsMuted] = useState(initialMuted || false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showReaction, setShowReaction] = useState(false)
  const [reactionType, setReactionType] = useState<"heart" | "sparkle" | "crown" | "smile">("heart")
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: string; message: string; timestamp: Date }>
  >([])
  const [newMessage, setNewMessage] = useState("")
  const [showControls, setShowControls] = useState(true)
  const [showReactions, setShowReactions] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [showRatingTooltip, setShowRatingTooltip] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // Add these state variables inside the VideoStream component
  const [showPrivateChat, setShowPrivateChat] = useState(false)

 
  // Auto-hide controls after inactivity
  useEffect(() => {
    if (isLocal && !isHovered) {
      const timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)

      return () => clearTimeout(timer)
    } else if (isHovered) {
      setShowControls(true)
    }
  }, [isLocal, isHovered])

  useEffect(() => {
    if (videoTrack && videoRef.current) {
      videoTrack.play(videoRef.current)
      return () => {
        videoTrack?.stop()
      }
    }
  }, [videoTrack])

  useEffect(() => {
    setIsMuted(initialMuted || false)
  }, [initialMuted])


  // Function to mute/unmute the audio
  const toggleMuteAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (audioTrack) {
      if (isMuted) {
        audioTrack.play()
      } else {
        audioTrack.stop()
      }
    }
    setIsMuted(!isMuted)
  }

  // Function to toggle video on/off
  const toggleVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (videoTrack) {
      if (isVideoOff) {
        videoTrack.play(videoRef.current as HTMLDivElement)
      } else {
        videoTrack.stop()
      }
    }
    setIsVideoOff(!isVideoOff)

  }

  const handleToggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleMaximize?.()
  }

  const handleMuteRemoteUser = (e: React.MouseEvent) => {
    e.stopPropagation()
    onMuteRemoteUser?.()
  }

 
  // Replace the existing toggleChat function with this one
  const toggleChat = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (showChat) {
      setShowChat(false)
      setShowPrivateChat(false)
    } else {
      // Use the enhanced private chat for 1:1 conversations
      setShowPrivateChat(true)
      setShowChat(true)
      setTimeout(() => {
        chatInputRef.current?.focus()
      }, 100)
    }
  }

  const toggleReactions = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setShowReactions(!showReactions)
  }

  const toggleSettings = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setShowSettings(!showSettings)
  }

  const handleRateUser = (rating: number) => {
    setUserRating(rating)
    setShowRatingTooltip(true)
    setTimeout(() => setShowRatingTooltip(false), 2000)
  }

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-300 group",
        maximisedUser === userId ? "fixed inset-0 z-50" : "",
        isSpeaking && !isMaximized && "ring-2 ring-green-500",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video container */}
      <div
        ref={videoRef}
        className={cn("absolute inset-0 bg-gray-900 h-full w-full", isMaximized ? "object-contain" : "object-cover")}
      >
        {/* Fallback when video is off */}
        {(!videoTrack || isVideoOff) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/90 to-purple-800/90">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-75 blur-sm animate-pulse"></div>
              <Avatar className="w-20 h-20 border-4 border-white/30">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-pink-400 to-purple-600 text-white font-bold">
                    {userName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>
        )}
      </div>

      {isLocal && transcription && (
        <VideoTranscriptionOverlay
          messages={messages} 
          settings={settings} 
        />
      )}
   
      {/* Animated reactions */}
      <AnimatePresence>
        {showReaction && (
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {reactionType === "heart" && (
                <motion.div
                  animate={{ y: [-20, -100], opacity: [1, 0] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-pink-500 text-6xl"
                >
                  <Heart fill="currentColor" size={64} />
                </motion.div>
              )}
              {reactionType === "sparkle" && (
                <motion.div
                  animate={{ y: [-20, -100], opacity: [1, 0] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-yellow-400 text-6xl"
                >
                  <Sparkles fill="currentColor" size={64} />
                </motion.div>
              )}
              {reactionType === "crown" && (
                <motion.div
                  animate={{ y: [-20, -100], opacity: [1, 0] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-amber-500 text-6xl"
                >
                  <Crown fill="currentColor" size={64} />
                </motion.div>
              )}
              {reactionType === "smile" && (
                <motion.div
                  animate={{ y: [-20, -100], opacity: [1, 0] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-green-400 text-6xl"
                >
                  <Smile fill="currentColor" size={64} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User info overlay with professional design */}
      <div
        className={cn(
          "absolute top-3 left-3 right-3 flex items-start justify-between transition-all duration-300 z-10",
          !isHovered && !isMaximized && !isSpeaking ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
        )}
      >
        <div className="flex items-center space-x-2">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                {isLocal ? (
                  <Crown size={12} className="text-yellow-300" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                )}
              </div>
              <p className="text-sm font-medium text-white truncate max-w-[150px]">
                {userName}
              </p>
              {isHandRaised && (
                <Badge
                  className="flex items-center space-x-1 bg-gradient-to-r from-amber-500/80 to-yellow-500/80 text-white border-0 shadow-md"
                >
                  <Hand size={12} className="mr-1" />
                  <span className="font-medium">Hand Raised</span>
                </Badge>
              )}

              {/* User rating stars */}
              {!isLocal && (
                <div className="flex items-center ml-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRateUser(star)}
                      className={`w-3 h-3 ${star <= userRating ? "text-yellow-400" : "text-gray-400"} focus:outline-none`}
                    >
                      <Star size={12} fill={star <= userRating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              )}
        
            </div>
          </div>

          {showRatingTooltip && (
            <div className="bg-black/70 text-white text-xs py-1 px-2 rounded absolute top-10 left-0 animate-fade-in">
              Rating submitted!
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {isMuted && (
            <div className="bg-red-500/80 rounded-full p-1.5 shadow-lg border border-white/10 animate-pulse">
              <MicOff size={14} className="text-white" />
            </div>
          )}

          {isSpeaking && (
            <div className="bg-green-500/80 rounded-full p-1.5 shadow-lg border border-white/10">
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-3 bg-white rounded-full animate-pulse"></span>
                <span className="w-1.5 h-4 bg-white rounded-full animate-pulse delay-75"></span>
                <span className="w-1.5 h-2 bg-white rounded-full animate-pulse delay-150"></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hand raised indicator */}
      {isHandRaised && !isScreen && (
        <div className="absolute top-3 right-3 z-20">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 opacity-70 blur-sm animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-amber-500 to-yellow-600 p-2 rounded-full shadow-lg border border-white/20">
              <Hand className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Premium Chat Overlay */}

        {/* {showChat && !isLocal && !isScreen && (
        <SingleChat 
          isOpen={showChat}
          onClose={toggleChat}    
          recipientId={userId}
          recipientName={userName as string}
          recipientAvatar={userAvatar}/>
        )} */}
      {/* Professional controls overlay */}
      <AnimatePresence>
        {(showControls || isHovered) && !isLocal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn("absolute bottom-0 left-0 right-0 transition-all duration-300 z-10")}
          >
            {/* Gradient background */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Main controls container */}
            <div className="relative px-4 py-3 flex justify-between items-end z-10">
              <div className="flex space-x-2">
                {!isLocal && !isScreen ? (
                  <>
                    {/* Mic button with professional animation */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleMuteAudio}
                            className={cn(
                              "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-lg",
                              isMuted
                                ? "bg-red-500/90 hover:bg-red-600"
                                : "bg-white/20 hover:bg-white/30 backdrop-blur-md",
                            )}
                          >
                            {isMuted ? (
                              <MicOff size={16} className="text-white" />
                            ) : (
                              <>
                                <Mic size={16} className="text-white" />
                                {!isMuted && (
                                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                                )}
                              </>
                            )}
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-black/80 text-white border-none">
                          {isMuted ? "Unmute" : "Mute"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Video button with professional design */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleVideo}
                            className={cn(
                              "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-lg",
                              isVideoOff
                                ? "bg-red-500/90 hover:bg-red-600"
                                : "bg-white/20 hover:bg-white/30 backdrop-blur-md",
                            )}
                          >
                            {isVideoOff ? (
                              <VideoOff size={16} className="text-white" />
                            ) : (
                              <>
                                <Video size={16} className="text-white" />
                                {!isVideoOff && (
                                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                                )}
                              </>
                            )}
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-black/80 text-white border-none">
                          {isVideoOff ? "Turn on camera" : "Turn off camera"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                ) : (<>
                 {!isLocal && <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 shadow-lg"
                      >
                        <MoreVertical size={16} className="text-white" />
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="bg-black/90 backdrop-blur-md border-white/10 text-white rounded-xl p-1.5 shadow-xl"
                    >
                      <DropdownMenuItem
                        onClick={handleMuteRemoteUser}
                        className="hover:bg-white/10 rounded-lg cursor-pointer"
                      >
                        {isMuted ? (
                          <Volume2 className="mr-2 h-4 w-4 text-green-400" />
                        ) : (
                          <VolumeX className="mr-2 h-4 w-4 text-red-400" />
                        )}
                        {isMuted ? "Unmute for me" : "Mute for me"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleToggleMaximize}
                        className="hover:bg-white/10 rounded-lg cursor-pointer"
                      >
                        <Pin className="mr-2 h-4 w-4 text-blue-400" />
                        {isMaximized ? "Unpin" : "Pin to screen"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={toggleChat} className="hover:bg-white/10 rounded-lg cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4 text-purple-400" />
                        {showChat ? "Hide chat" : "Private chat"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  }
                  </>
                )}
                

                {/* Chat button */}
                {!isLocal && maximisedUser === userId && 
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleChat}
                        className={cn(
                          "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-lg",
                          showChat
                            ? "bg-indigo-500/90 hover:bg-indigo-600"
                            : "bg-white/20 hover:bg-white/30 backdrop-blur-md",
                        )}
                      >
                        <MessageSquare size={16} className="text-white" />
                        {chatMessages.length > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                            {chatMessages.length}
                          </span>
                        )}
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-black/80 text-white border-none">
                      {showChat ? "Hide chat" : "Show chat"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>}

                {/* Reactions button */}
                {!isLocal && <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleReactions}
                        className={cn(
                          "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-lg",
                          showReactions
                            ? "bg-pink-500/90 hover:bg-pink-600"
                            : "bg-white/20 hover:bg-white/30 backdrop-blur-md",
                        )}
                      >
                        <Heart size={16} className="text-white" />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-black/80 text-white border-none">
                      {showReactions ? "Hide reactions" : "Show reactions"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>}

                {/* Settings button */}
                {isLocal && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleSettings}
                          className={cn(
                            "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-lg",
                            showSettings
                              ? "bg-amber-500/90 hover:bg-amber-600"
                              : "bg-white/20 hover:bg-white/30 backdrop-blur-md",
                          )}
                        >
                          <Settings size={16} className="text-white" />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-black/80 text-white border-none">
                        {showSettings ? "Hide settings" : "Show settings"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              {/* Reactions panel */}
              {/* <AnimatePresence>
                {showReactions && (
                 <VideoReactions
                  currentUserId={getOrCreateUserId()}
                  currentUserName={getOrCreateUserId().toString().split("-")[4]}
                  recipientId={userId}
                  sendReaction={sendReaction}
                />
                )}
              </AnimatePresence> */}

              {/* Settings panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-16 left-4 bg-black/70 backdrop-blur-md rounded-xl p-3 border border-white/10 w-64"
                  >
                    <h4 className="text-white text-sm font-medium mb-2 flex items-center">
                      <Settings size={14} className="mr-2" />
                      Stream Settings
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-xs">Video Quality</span>
                        <select className="bg-white/10 text-white text-xs rounded border-0 p-1">
                          <option>High (720p)</option>
                          <option>Medium (480p)</option>
                          <option>Low (360p)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-xs">Background Blur</span>
                        <div className="flex items-center">
                          <input type="range" className="w-20 h-1 bg-white/20 rounded-lg appearance-none" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-xs">Noise Suppression</span>
                        <div className="relative inline-block w-8 h-4 rounded-full bg-white/10">
                          <input type="checkbox" className="sr-only" />
                          <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-indigo-500"></span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Maximize button with professional design */}
              {!isLocal && <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleMaximize}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 shadow-lg"
              >
                {isMaximized ? (
                  <Minimize2 size={16} className="text-white" />
                ) : (
                  <Maximize2 size={16} className="text-white" />
                )}
              </motion.button>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaking indicator with professional animation */}
      {isSpeaking && (
        <>
          <div className="absolute inset-0 border-2 border-green-400/50 rounded-xl pointer-events-none"></div>
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-green-500/80 px-2 py-1 rounded-full shadow-lg z-10">
            <div className="flex space-x-1 items-center">
              <span className="w-1 h-3 bg-white rounded-full animate-pulse"></span>
              <span className="w-1 h-4 bg-white rounded-full animate-pulse delay-75"></span>
              <span className="w-1 h-2 bg-white rounded-full animate-pulse delay-150"></span>
            </div>
          </div>
        </>
      )}

      {/* <ReactionDisplay
        reactionsList={reactions}
        videoContainerRef={videoRef}
      /> */}
    </div>
  )
}

