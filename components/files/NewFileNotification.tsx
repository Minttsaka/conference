"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { File, FileText, FileImage, FileVideo, FileAudio, X, Eye } from "lucide-react"
import type { SharedFile } from "./FilesDialog"

interface NewFileNotificationProps {
  file: SharedFile
  onView: () => void
  onClose: () => void
}

export function NewFileNotification({ file, onView, onClose }: NewFileNotificationProps) {
  // Get file icon based on type
  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return <FileImage className="h-5 w-5" />
    } else if (file.type.startsWith("video/")) {
      return <FileVideo className="h-5 w-5" />
    } else if (file.type.startsWith("audio/")) {
      return <FileAudio className="h-5 w-5" />
    } else if (
      file.type.includes("pdf") ||
      file.type.includes("doc") ||
      file.type.includes("txt") ||
      file.type.includes("sheet")
    ) {
      return <FileText className="h-5 w-5" />
    } else {
      return <File className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 z-50 max-w-sm w-full"
    >
      <div className="relative overflow-hidden rounded-lg border border-indigo-100 dark:border-indigo-800/50 bg-white dark:bg-gray-900 shadow-lg">
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 dark:bg-indigo-600 animate-shrink-width"></div>

        <div className="p-4">
          <div className="flex items-start">
            {/* Icon */}
            <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">{getFileIcon()}</div>

            {/* Content */}
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">New File Shared</h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">{file.uploadedBy.name}</span> has
                shared a file: <span className="font-medium">{file.name}</span>
              </p>

              {/* Actions */}
              <div className="mt-3 flex space-x-2">
                <Button size="sm" variant="outline" onClick={onClose} className="text-xs h-8 px-3">
                  Dismiss
                </Button>
                <Button
                  size="sm"
                  onClick={onView}
                  className="text-xs h-8 px-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  View File
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
  )
}

