"use client"

import { motion } from "framer-motion"
import { FileAudio } from "lucide-react"

interface TranscriptionStatusBadgeProps {
  isActive: boolean
  className?: string
}

export function TranscriptionStatusBadge({ isActive, className = "" }: TranscriptionStatusBadgeProps) {
  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}
      style={{
        background: "linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))",
        border: "1px solid rgba(99, 102, 241, 0.2)",
      }}
    >
      <FileAudio className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
      <span className="text-indigo-700 dark:text-indigo-300">Live Transcription</span>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
      </span>
    </motion.div>
  )
}

