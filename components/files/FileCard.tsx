"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileIcon as FilePpt,
  FileSpreadsheet,
  Download,
  Trash2,
  MoreVertical,
  ExternalLink,
  Check,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { FileItem } from "@/types/clasroom"

interface FileCardProps {
  file: FileItem
  onDelete: () => void
  isCurrentUser: boolean
  isSelected?: boolean
  isCompact?: boolean
}

export function FileCard({ file, onDelete, isCurrentUser, isSelected = false, isCompact = false }: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get file icon based on type
  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return <FileImage className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
    } else if (file.type.startsWith("video/")) {
      return <FileVideo className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
    } else if (file.type.startsWith("audio/")) {
      return <FileAudio className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
    } else if (file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("txt")) {
      return <FileText className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
    } else if (
      file.type.includes("presentation") ||
      file.type.includes("powerpoint") ||
      file.name.endsWith(".pptx") ||
      file.name.endsWith(".ppt")
    ) {
      return <FilePpt className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
    } else if (
      file.type.includes("sheet") ||
      file.type.includes("excel") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".csv")
    ) {
      return <FileSpreadsheet className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
    } else {
      return <File className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
    }
  }

  // Get file icon color class
  const getFileIconColorClass = () => {
    if (file.type.startsWith("image/")) {
      return "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    } else if (file.type.startsWith("video/")) {
      return "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
    } else if (file.type.startsWith("audio/")) {
      return "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    } else if (file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("txt")) {
      return "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
    } else if (
      file.type.includes("presentation") ||
      file.type.includes("powerpoint") ||
      file.name.endsWith(".pptx") ||
      file.name.endsWith(".ppt")
    ) {
      return "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
    } else if (
      file.type.includes("sheet") ||
      file.type.includes("excel") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".csv")
    ) {
      return "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
    } else {
      return "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
    }
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB"
    else return (bytes / 1073741824).toFixed(1) + " GB"
  }

  // Handle download
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    const a = document.createElement("a")
    a.href = file.url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Handle open in new tab
  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(file.url, "_blank")
  }

  // Compact view for file list
  if (isCompact) {
    return (
      <div
        className={cn(
          "relative rounded-lg border overflow-hidden transition-all duration-200",
          isSelected
            ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20"
            : file.createdAt === new Date()
              ? "border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-900/10"
              : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
          isHovered && !isSelected && "border-gray-300 dark:border-gray-700",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-3 flex items-center gap-3">
          {/* File icon */}
          <div
            className={cn("h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0", getFileIconColorClass())}
          >
            {getFileIcon()}
          </div>

          {/* File info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate" title={file.name}>
              {file.name}
            </h3>
            <div className="flex items-center mt-0.5">
              <p className="text-xs text-gray-500 dark:text-gray-400">{file.uploader}</p>
            </div>
          </div>

          {/* Selected indicator */}
          {isSelected && (
            <div className="h-5 w-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}

          {/* Actions */}
          {isHovered && !isSelected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleOpenInNewTab}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in new tab
                </DropdownMenuItem>
                {isCurrentUser && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete()
                    }}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    )
  }

  // Full card view for grid layout
  return (
    <motion.div
      id={`file-${file.id}`}
      className={`relative rounded-lg border ${
        file.createdAt === new Date()
          ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-900/20"
          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      } overflow-hidden transition-all duration-200 hover:shadow-md`}
      initial={file.createdAt === new Date() ? { scale: 0.95, opacity: 0 } : { scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* New file indicator */}
      {file.createdAt === new Date() && (
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
            New
          </span>
        </div>
      )}

      {/* File preview */}
      <div className="aspect-video w-full relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {file.type.startsWith("image/") ? (
          <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
        ) : (
          <div className={`h-16 w-16 rounded-lg flex items-center justify-center ${getFileIconColorClass()}`}>
            {getFileIcon()}
          </div>
        )}

        {/* Hover actions */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button size="sm" variant="secondary" className="rounded-full h-9 w-9 p-0" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
            <Button size="sm" variant="secondary" className="rounded-full h-9 w-9 p-0" onClick={handleOpenInNewTab}>
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Open</span>
            </Button>
            {isCurrentUser && (
              <Button size="sm" variant="destructive" className="rounded-full h-9 w-9 p-0" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </motion.div>
        )}
      </div>

      {/* File info */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="truncate">
            <h3 className="text-sm font-medium truncate" title={file.name}>
              {file.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenInNewTab}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in new tab
              </DropdownMenuItem>
              {isCurrentUser && (
                <DropdownMenuItem onClick={onDelete} className="text-red-600 dark:text-red-400">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center mt-2">
          <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
            {/* User avatar placeholder */}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-1.5 truncate">{file.uploader}</p>
        </div>
      </div>
    </motion.div>
  )
}

