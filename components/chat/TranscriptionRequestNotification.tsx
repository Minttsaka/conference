"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileAudio, X } from "lucide-react"

interface TranscriptionRequestNotificationProps {
  isVisible: boolean
  requesterName: string
  onAccept: () => void
  onDecline: () => void
  onClose: () => void
  autoHideAfter?: number // in milliseconds
}

export function TranscriptionRequestNotification({
  isVisible,
  requesterName,
  onAccept,
  onDecline,
  onClose,
  autoHideAfter = 15000, // Default 15 seconds
}: TranscriptionRequestNotificationProps) {
  const [timeLeft, setTimeLeft] = useState(autoHideAfter / 1000)

  // Auto-hide countdown
  useEffect(() => {
    if (!isVisible) return

    setTimeLeft(autoHideAfter / 1000)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible, autoHideAfter, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className="relative overflow-hidden rounded-lg border border-indigo-100 dark:border-indigo-800/50 bg-white dark:bg-gray-900 shadow-lg">
            {/* Progress bar */}
            <div
              className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 dark:bg-indigo-600"
              style={{
                width: `${(timeLeft / (autoHideAfter / 1000)) * 100}%`,
                transition: "width 1s linear",
              }}
            ></div>

            <div className="p-4">
              <div className="flex items-start">
                {/* Icon */}
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                  <FileAudio className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>

                {/* Content */}
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Transcription Request</h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">{requesterName}</span> has
                    requested to enable live transcription for this meeting.
                  </p>

                  {/* Actions */}
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline" onClick={onDecline} className="text-xs h-8 px-3">
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      onClick={onAccept}
                      className="text-xs h-8 px-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                    >
                      Allow Transcription
                    </Button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  type="button"
                  className="flex-shrink-0 ml-2 bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

