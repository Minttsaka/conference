"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileItem } from "@/types/clasroom"
interface FileViewerProps {
  file: FileItem
}

export function FileViewer({ file }: FileViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reset loading state when file changes
    setIsLoading(true)
    setError(null)

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [file])

  // Determine the appropriate viewer based on file type
  const renderFileViewer = () => {
    // Handle loading state
    if (isLoading) {
      return (
        <div className="h-full flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            <Skeleton className="h-64 w-full rounded-lg mb-4" />
            <Skeleton className="h-4 w-3/4 rounded mb-2" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </div>
      )
    }

    // Handle images
    if (file.type.startsWith("image/")) {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <img
            src={file.url || "/placeholder.svg"}
            alt={file.name}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            onError={() => setError("Failed to load image")}
          />
        </div>
      )
    }

    // Handle PDFs
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      return (
        <div className="h-full w-full">
          <iframe
            src={`${file.url}#toolbar=0&navpanes=0`}
            className="w-full h-full border-0"
            title={file.name}
            onError={() => setError("Failed to load PDF")}
          />
        </div>
      )
    }

    // Handle videos
    if (file.type.startsWith("video/")) {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <video
            src={file.url}
            controls
            className="max-w-full max-h-full rounded-lg shadow-lg"
            onError={() => setError("Failed to load video")}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }

    // Handle audio
    if (file.type.startsWith("audio/")) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <FileText className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-center mb-4">{file.name}</h3>
            <audio src={file.url} controls className="w-full" onError={() => setError("Failed to load audio")}>
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      )
    }

    // Handle PowerPoint presentations using Microsoft's Office viewer
    if (
      file.type.includes("presentation") ||
      file.type.includes("powerpoint") ||
      file.name.endsWith(".pptx") ||
      file.name.endsWith(".ppt")
    ) {
      // For demo purposes, we're using a direct URL
      // In a real app, you'd need to ensure the file is accessible via a public URL
      const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file.url)}`

      return (
        <div className="h-full w-full">
          <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title={file.name}
            onError={() => setError("Failed to load presentation")}
          />
        </div>
      )
    }

    // Handle Word documents using Microsoft's Office viewer
    if (
      file.type.includes("document") ||
      file.type.includes("msword") ||
      file.name.endsWith(".docx") ||
      file.name.endsWith(".doc")
    ) {
      const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file.url)}`

      return (
        <div className="h-full w-full">
          <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title={file.name}
            onError={() => setError("Failed to load document")}
          />
        </div>
      )
    }

    // Handle Excel spreadsheets using Microsoft's Office viewer
    if (
      file.type.includes("sheet") ||
      file.type.includes("excel") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls")
    ) {
      const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file.url)}`

      return (
        <div className="h-full w-full">
          <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title={file.name}
            onError={() => setError("Failed to load spreadsheet")}
          />
        </div>
      )
    }

    // Handle text files
    if (
      file.type === "text/plain" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".json") ||
      file.name.endsWith(".csv")
    ) {
      return <TextFileViewer file={file} onError={(msg) => setError(msg)} />
    }

    // Default file preview (for unsupported types)
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <FileText className="h-10 w-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Preview not available</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            This file type cannot be previewed. You can download the file to view it.
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 inline-block">
            {file.type || "Unknown file type"}
          </div>
        </div>
      </div>
    )
  }

  // Handle errors
  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}. Please try downloading the file instead.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return <div className="h-full">{renderFileViewer()}</div>
}

// Component to handle text file viewing
function TextFileViewer({ file, onError }: { file: FileItem; onError: (msg: string) => void }) {
  const [content, setContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTextContent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(file.url)
        if (!response.ok) {
          throw new Error("Failed to load file content")
        }
        const text = await response.text()
        setContent(text)
      } catch (error) {
        onError("Failed to load text content")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTextContent()
  }, [file, onError])

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <pre className="whitespace-pre-wrap break-words text-sm font-mono bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          {content}
        </pre>
      </div>
    </ScrollArea>
  )
}

