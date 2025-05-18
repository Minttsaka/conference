"use client"

import { File, FileText, FileImage, FileVideo, FileAudio, X, Check, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FileUploadCardProps {
  file: File
  progress: number
  status: "uploading" | "success" | "error"
  error?: string
}

export function FileUploadCard({ file, progress, status, error }: FileUploadCardProps) {
  // Get file icon based on type
  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return <FileImage className="h-6 w-6" />
    } else if (file.type.startsWith("video/")) {
      return <FileVideo className="h-6 w-6" />
    } else if (file.type.startsWith("audio/")) {
      return <FileAudio className="h-6 w-6" />
    } else if (
      file.type.includes("pdf") ||
      file.type.includes("doc") ||
      file.type.includes("txt") ||
      file.type.includes("sheet")
    ) {
      return <FileText className="h-6 w-6" />
    } else {
      return <File className="h-6 w-6" />
    }
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB"
    else return (bytes / 1073741824).toFixed(1) + " GB"
  }

  return (
    <div
      className={`rounded-lg border ${
        status === "error"
          ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20"
          : status === "success"
            ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20"
            : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      } overflow-hidden transition-all duration-200`}
    >
      <div className="p-3 flex items-center gap-3">
        {/* File icon */}
        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            file.type.startsWith("image/")
              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : file.type.startsWith("video/")
                ? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                : file.type.startsWith("audio/")
                  ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  : "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
          }`}
        >
          {getFileIcon()}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate" title={file.name}>
            {file.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{formatFileSize(file.size)}</p>
        </div>

        {/* Status icon */}
        <div className="flex-shrink-0">
          {status === "uploading" ? (
            <div className="h-6 w-6 text-gray-400 dark:text-gray-500">
              <svg
                className="animate-spin h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : status === "success" ? (
            <div className="h-6 w-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4" />
            </div>
          ) : (
            <div className="h-6 w-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center">
              <X className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {status === "uploading" && (
        <div className="px-3 pb-3">
          <Progress value={progress} className="h-1.5" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{Math.round(progress)}% uploaded</p>
        </div>
      )}

      {/* Error message */}
      {status === "error" && error && (
        <div className="px-3 pb-3 flex items-start gap-1.5">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}

