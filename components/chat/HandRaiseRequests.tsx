"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hand, Check, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface HandRaiseRequestsProps {
  pendingRequests: Map<string, { name: string; timestamp: number }>
  onAccept: (userId: string) => void
  onDecline: () => void
}

export function HandRaiseRequests({ pendingRequests, onAccept, onDecline }: HandRaiseRequestsProps) {
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  if (pendingRequests.size === 0) {
    return null
  }

  // Sort requests by timestamp (newest first)
  const sortedRequests = Array.from(pendingRequests.entries()).sort((a, b) => b[1].timestamp - a[1].timestamp)

  // Format time elapsed
  const formatTimeElapsed = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ago`
  }

  return (
    <div className="absolute bottom-28 right-8 z-20 max-w-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-orange-500/30 dark:from-yellow-500/20 dark:via-amber-500/20 dark:to-orange-500/20 blur-sm"></div>
          <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-amber-50/50 dark:bg-amber-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center">
                    <Hand className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Hand Raise Requests</h3>
                </div>
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-full">
                  {pendingRequests.size}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 rounded-full bg-red-100/80 hover:bg-red-200/80 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400"
                  onClick={onDecline}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {sortedRequests.map(([userId, { name, timestamp }]) => (
                <div
                  key={userId}
                  className={cn(
                    "px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 transition-colors",
                    expandedRequest === userId
                      ? "bg-amber-50/80 dark:bg-amber-900/10"
                      : "hover:bg-gray-50/80 dark:hover:bg-gray-800/50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-medium">
                          {name[0]?.toUpperCase() || "U"}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                          <Hand className="h-2 w-2 text-white" />
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeElapsed(timestamp)}</span>
                        </div>
                      </div>
                    </div>
                   
                  </div>

                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

