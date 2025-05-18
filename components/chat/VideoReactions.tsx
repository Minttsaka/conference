"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"
import { Heart, SmilePlus, ThumbsUp, Star, FlameIcon as Fire, Zap } from "lucide-react"
import { ReactionMessage } from "@/lib/initAgoraClient"

interface VideoReactionsProps {
  currentUserId: string
  currentUserName?: string
  currentUserAvatar?: string
  recipientId: string
  sendReaction: (reactionMessage: ReactionMessage)=>Promise<void>
  onReceiveReaction?: (reaction: any) => void
}

type ReactionEmoji = {
  icon: LucideIcon;
  color: string;
  label: string;
};

export function VideoReactions({
  currentUserId,
  currentUserName,
  currentUserAvatar,
  recipientId,
  sendReaction,
}: VideoReactionsProps) {

  const reactionEmojis: ReactionEmoji[] = [
    { icon: Heart, color: "text-pink-500", label: "heart" },
    { icon: SmilePlus, color: "text-yellow-500", label: "smile" },
    { icon: ThumbsUp, color: "text-blue-500", label: "thumbs-up" },
    { icon: Star, color: "text-amber-500", label: "star" },
    { icon: Fire, color: "text-orange-500", label: "fire" },
    { icon: Zap, color: "text-purple-500", label: "zap" },
  ]
  // Flying reactions state
  const [reactions, setReactions] = useState<ReactionMessage[]>([])
  const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false)
  const videoContainerRef = useRef<HTMLDivElement | null>(null)

  // Effect to set the video container ref
  useEffect(() => {
    // Find the main video container element
    const container = document.querySelector(".video-grid") || document.querySelector(".video-container")
    if (container) {
      videoContainerRef.current = container as HTMLDivElement
    }
  }, [])


  // Handle sending a reaction
  const handleSendReaction = async (emoji: string) => {
    try {
      // Send the reaction to the recipient

      const newReaction: ReactionMessage = {
        type: "reaction",
        emoji,
        senderId:currentUserId,
        senderName:currentUserName  as string,
        senderAvatar: currentUserAvatar as string,
        recipientId,
        timestamp: new Date().toISOString(),
      }

      
      await sendReaction(newReaction)

    } catch (error) {
      console.error("Failed to send reaction:", error)
    }
  }

  // Show reaction animation

  return (
    <>
      {/* Reaction menu */}
      <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="transform -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-xl p-2 border border-white/10 z-30"
          >
            <div className="flex space-x-2">
              {reactionEmojis.map((reaction) => (
                <motion.button
                  key={reaction.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shadow-lg",
                    reaction.color.replace("text-", "bg-").replace("500", "500/80"),
                    reaction.color.replace("text-", "hover:bg-").replace("500", "600"),
                  )}
                  onClick={() => handleSendReaction(reaction.label)}
                >
                  <reaction.icon className="h-4 w-4 text-white" />
                </motion.button>
              ))}
            </div>
          </motion.div>
      </AnimatePresence>

    </>
  )
}

