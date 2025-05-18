"use client"

import { useEffect, useRef, useState } from "react"
import type { Message, TranscriptionSettings } from "@/types/room"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, ChevronUp, ChevronDown } from 'lucide-react'

interface VideoTranscriptionOverlayProps {
  messages?: Message[]
  settings?: TranscriptionSettings
  isVisible?: boolean
}

export function VideoTranscriptionOverlay({ 
  messages, 
  settings, 
  isVisible = true 
}: VideoTranscriptionOverlayProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const recentMessages = messages?.slice(-5) // Only show the 5 most recent messages

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current && !isCollapsed) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isCollapsed])

  if (!isVisible) return null

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toggle button - always visible and clickable */}
      <motion.button
        initial={{ opacity: 0.6 }}
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-3 left-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white pointer-events-auto"
      >
        {isCollapsed ? (
          <>
            <Mic className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          </>
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </motion.button>

      {/* Transcription panel */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="pointer-events-auto"
          >
            <div className="relative mx-3 mb-3 overflow-hidden">
              {/* Gradient background with blur */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-sm"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
              <div className="absolute -inset-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 blur-3xl"></div>
              
              {/* Content */}
              <div className="relative pt-4 pb-2 px-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-indigo-300">Live Transcription</span>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                <ScrollArea className="max-h-32" ref={scrollAreaRef}>
                  <div className="space-y-2">
                    {recentMessages?.length === 0 ? (
                      <div className="text-center text-gray-400 py-2">
                        <p className="text-xs">No transcriptions yet. Start speaking to see transcriptions appear here.</p>
                      </div>
                    ) : (
                      recentMessages?.map((message) => (
                        <div
                          key={message.id}
                          className={`space-y-0.5 ${
                            settings?.highlightCurrentSpeaker &&
                            message.participantId === messages?.[messages?.length - 1]?.participantId
                              ? "bg-indigo-500/10 p-1.5 rounded-md -mx-1.5"
                              : ""
                          }`}
                        >
                          {settings?.showSpeakerNames && (
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-xs text-indigo-300">{message.participantName}</span>
                              <span className="text-xs text-gray-400">
                                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                              </span>
                            </div>
                          )}
                          <p 
                            style={{ fontSize: `${Math.min(settings?.fontSize as number, 16)}px` }} 
                            className="leading-relaxed text-white/90"
                          >
                            {message.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}