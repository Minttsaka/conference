"use client"

import { motion } from "framer-motion"

export default function TypingIndicator() {
  return (
    <div className="mt-2 flex items-center">
      <div className="text-[8px] font-mono text-cyan-400/70 uppercase tracking-wider mr-2">Incoming transmission</div>
      <div className="flex items-center space-x-1">
        <motion.div
          className="h-1 w-1 rounded-full bg-cyan-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        />
        <motion.div
          className="h-1 w-1 rounded-full bg-cyan-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, delay: 0.2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        />
        <motion.div
          className="h-1 w-1 rounded-full bg-cyan-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, delay: 0.4, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        />
      </div>
    </div>
  )
}
