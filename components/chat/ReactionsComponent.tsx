"use client"

import { useState, useEffect, useRef, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Heart, SmilePlus, ThumbsUp, Star, FlameIcon as Fire, Zap } from 'lucide-react'

// Define the reaction message type
interface ReactionMessage {
  type: "reaction"
  emoji: string
  senderId: string
  senderName?: string
  senderAvatar?: string
  recipientId: string
  timestamp: string
}

interface ReactionDisplayProps {
  reactionsList: Set<ReactionMessage>
  videoContainerRef: React.RefObject<HTMLDivElement>
}

// Use memo to prevent unnecessary re-renders
const ReactionDisplay = memo(({ reactionsList, videoContainerRef }: ReactionDisplayProps) => {
  // State to track the current reaction to display
  const [currentReaction, setCurrentReaction] = useState<ReactionMessage | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const prevReactionsLengthRef = useRef(0)
  
  // Map of emoji names to their icon components
  const reactionEmojis = {
    "heart": { icon: Heart, color: "text-pink-500" },
    "smile": { icon: SmilePlus, color: "text-yellow-500" },
    "thumbs-up": { icon: ThumbsUp, color: "text-blue-500" },
    "star": { icon: Star, color: "text-amber-500" },
    "fire": { icon: Fire, color: "text-orange-500" },
    "zap": { icon: Zap, color: "text-purple-500" }
  }

  // Function to get user video element position
  const getUserVideoPosition = (userId: string) => {
    if (!videoContainerRef.current) return { x: 0, y: 0 }

    // Try to find the video element for this user
    const userVideoElement = document.getElementById(`video-${userId}`)
    if (!userVideoElement) {
      // If not found, use a random position in the container
      const containerRect = videoContainerRef.current.getBoundingClientRect()
      return {
        x: Math.random() * containerRect.width,
        y: Math.random() * containerRect.height,
      }
    }

    // Get the position relative to the video container
    const videoRect = userVideoElement.getBoundingClientRect()
    const containerRect = videoContainerRef.current.getBoundingClientRect()

    return {
      x: videoRect.left - containerRect.left + videoRect.width / 2,
      y: videoRect.top - containerRect.top + videoRect.height / 4, // Start from upper part of video
    }
  }

  // Get initials for avatar
  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name.charAt(0).toUpperCase()
  }

  // Get random color for user (consistent for same user ID)
  const getUserColor = (userId: string) => {
    // Simple hash function to get consistent color
    const hash = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const colors = [
      "from-indigo-600 to-purple-700",
      "from-blue-600 to-cyan-700",
      "from-pink-600 to-rose-700",
      "from-amber-600 to-orange-700",
      "from-emerald-600 to-green-700",
      "from-violet-600 to-indigo-700",
    ]

    return colors[hash % colors.length]
  }

  // Effect to detect new reactions and display them
  useEffect(() => {
    // Check if reactionsList exists and has new reactions
    if (reactionsList && reactionsList.size > prevReactionsLengthRef.current) {
      // Get the latest reaction by converting Set to Array and getting the last element
      const reactionsArray = Array.from(reactionsList)
      const latestReaction = reactionsArray.length > 0 ? reactionsArray[reactionsArray.length - 1] : null
      
      // Only proceed if we have a valid reaction
      if (latestReaction) {
        // Calculate position based on sender's video
        const newPosition = getUserVideoPosition(latestReaction.senderId)
        setPosition(newPosition)
        
        // Set the current reaction to display
        setCurrentReaction(latestReaction)
        
        // Auto-clear after animation (3 seconds)
        const timer = setTimeout(() => {
          setCurrentReaction(null)
        }, 3000)
        
        // Update the reference for next comparison
        prevReactionsLengthRef.current = reactionsList.size
        
        return () => clearTimeout(timer)
      }
    }
  }, [reactionsList, getUserVideoPosition])

  // If no current reaction, don't render anything
  if (!currentReaction) return null

  // Get the emoji data
  const emojiData = reactionEmojis[currentReaction.emoji as keyof typeof reactionEmojis]
  if (!emojiData) return null

  const EmojiIcon = emojiData.icon
  
  return (
    <AnimatePresence>
      {currentReaction && (
        <motion.div
          key={`reaction-${currentReaction.timestamp}`}
          initial={{
            x: position.x,
            y: position.y,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            x: position.x + (Math.random() * 200 - 100),
            y: position.y - 150 - Math.random() * 100,
            scale: 1,
            opacity: 1,
          }}
          exit={{
            y: position.y - 300,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            duration: 2,
            bounce: 0.4,
          }}
          className="absolute flex items-center gap-1 z-50 pointer-events-none"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [-10, 10, -10],
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
              }}
              className="relative"
            >
              <div
                className={cn(
                  "absolute -inset-1 rounded-full blur-md opacity-50",
                  emojiData.color.replace("text-", "bg-"),
                )}
              />
              <EmojiIcon className={cn("h-8 w-8", emojiData.color)} />
            </motion.div>
          </div>

          <Avatar className="w-6 h-6 border border-white/20">
            {currentReaction.senderAvatar ? (
              <AvatarImage src={currentReaction.senderAvatar} alt={currentReaction.senderName || "User"} />
            ) : (
              <AvatarFallback className={`text-xs bg-gradient-to-br ${getUserColor(currentReaction.senderId)} text-white`}>
                {getInitials(currentReaction.senderName)}
              </AvatarFallback>
            )}
          </Avatar>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

ReactionDisplay.displayName = "ReactionDisplay"

export { ReactionDisplay }