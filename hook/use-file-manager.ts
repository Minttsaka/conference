"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { toast } from "sonner"
import { generateObjectId } from "@/lib/object-id"
import type { FileItem, UploadingFile, FileNotification } from "@/types/file"
import { uploadFileTos3 } from "@/lib/aws"
import { publishMessage } from "@/lib/agora"
import { getFiles } from "@/lib/api"

interface UseFileManagerProps {
  rtm: any
  channelName: string
  userName: string
  isOpen: boolean
}

interface PromisedFulfilledResult<T> extends PromiseFulfilledResult<T> {
  status: "fulfilled"
  value: T
}

export function useFileManager({ rtm, channelName, userName, isOpen }: UseFileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [newFileNotification, setNewFileNotification] = useState<FileNotification>({
    isVisible: false,
    file: null,
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const eventListenersSet = useRef(false)

  // Load files with proper error handling and abort support
  const loadFiles = useCallback(async () => {
    if (!isOpen) return

    try {
      setIsLoading(true)

      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      const response = await getFiles(channelName)


      if (response.success) {
        // Ensure dates are properly parsed
       
        setFiles(response.data);
        
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error loading files:", error)
      toast("Failed to load files")
      setFiles([]) // Reset to empty array on error
    } finally {
      setIsLoading(false)
    }
  }, [channelName, isOpen])

  // Load files when component opens
  useEffect(() => {
    if (isOpen) {
      loadFiles()
    }

    // Cleanup on unmount or when isOpen changes to false
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [isOpen, loadFiles])

  // RTM message handler
  const handleMessage = useCallback(
    async (event: any) => {
      try {
        const messageData = JSON.parse(event.message)

        console.log("message data", messageData)

        if (messageData) {
          loadFiles()
        }
      } catch (error) {
        console.error("Error parsing RTM message:", error)
      }
    },
    [userName],
  )

  // Set up RTM event listeners
  useEffect(() => {
    if (!rtm || !isOpen || eventListenersSet.current) return

    const handlePresence = (event: any) => {
      if (event.eventType === "SNAPSHOT") {
        console.log("Connected to file channel:", channelName)
      }
    }

    const handleStatus = (event: any) => {
      console.log("RTM status changed:", event.state, event.reason)
    }

    try {
      rtm.addEventListener("message", handleMessage)
      rtm.addEventListener("presence", handlePresence)
      rtm.addEventListener("status", handleStatus)
      eventListenersSet.current = true
    } catch (error) {
      console.error("Error setting up RTM listeners:", error)
    }

    return () => {
      if (rtm) {
        try {
          rtm.removeEventListener("message", handleMessage)
          rtm.removeEventListener("presence", handlePresence)
          rtm.removeEventListener("status", handleStatus)
        } catch (error) {
          console.error("Error removing RTM listeners:", error)
        }
      }
      eventListenersSet.current = false
    }
  }, [rtm, channelName, isOpen, handleMessage])

  // Auto-select latest file
  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[files.length - 1])
    }
  }, [files, selectedFile])


  // Handle file upload with proper error handling and progress tracking
  const handleFileUpload = async (selectedFiles: FileList) => {
    if (!selectedFiles || selectedFiles.length === 0) return

    // Validate files
    const maxFileSize = 50 * 1024 * 1024 // 50MB
    const allowedTypes = [
      "image/",
      "video/",
      "audio/",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument",
      "text/",
      "application/json",
    ]

    for (const file of selectedFiles) {
      if (file.size > maxFileSize) {
        toast.error(`File "${file.name}" is too large. Maximum size is 50MB.`)
        return
      }

      const isAllowedType = allowedTypes.some((type) => file.type.startsWith(type))
      if (!isAllowedType) {
        toast.error(`File type "${file.type}" is not allowed.`)
        return
      }
    }

    setIsUploading(true)

    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const uploadId = generateObjectId()

        // Add to uploading files state
        setUploadingFiles((prev) => [
          ...prev,
          {
            id: uploadId,
            file,
            progress: 0,
            status: "uploading",
          },
        ])

        try {
          // Upload to S3 (replace with your actual upload function)
          const uploadResponse = await uploadFileTos3(file, (progress) => {
            setUploadingFiles((prev) => prev.map((uf) => (uf.id === uploadId ? { ...uf, progress } : uf)))
          })

          if (!uploadResponse?.url) {
            throw new Error("Upload failed - no URL returned")
          }

          // Create file object
          const newFile: FileItem = {
            id: generateObjectId(),
            uploader: userName,
            name: file.name,
            type: file.type,
            url: uploadResponse.url,
            meetingId: channelName,
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          // Update uploading status
          setUploadingFiles((prev) =>
            prev.map((uf) => (uf.id === uploadId ? { ...uf, status: "success", progress: 100 } : uf)),
          )

          return newFile
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error)

          setUploadingFiles((prev) =>
            prev.map((uf) => (uf.id === uploadId ? { ...uf, status: "error" } : uf)),
          )

          throw error
        }
      })

      const uploadedFiles = await Promise.allSettled(uploadPromises)
      const successfulUploads = uploadedFiles
        .filter((result): result is PromisedFulfilledResult<FileItem> => result.status === "fulfilled")
        .map((result) => result.value)

      if (successfulUploads.length > 0) {

        for (const file of successfulUploads) {
          await publishMessage(rtm, `${channelName}file`, file)
        }
        // Save to database
        const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/api/files/${channelName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uploader: userName,
            files: successfulUploads.map((file) => ({
              name: file.name,
              type: file.type,
              url: file.url,
            })),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to save files to database")
        }
       

        toast.success(`Successfully uploaded ${successfulUploads.length} file(s)`)
      }

      const failedUploads = uploadedFiles.filter((result) => result.status === "rejected")
      if (failedUploads.length > 0) {
        toast.error(`Failed to upload ${failedUploads.length} file(s)`)
      }
    } catch (error) {
      console.error("Error in file upload process:", error)
      toast.error("Failed to upload files")
    } finally {
      setIsUploading(false)
      // Clear uploading files after a delay
      setTimeout(() => {
        setUploadingFiles([])
      }, 3000)
    }
  }

  // Handle file deletion
  const handleDeleteFile = useCallback(
    async (fileId: string) => {
      try {
        const response = await fetch(`/api/files/${channelName}/${fileId}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete file")
        }

        // Remove from local state
        setFiles((prev) => prev.filter((file) => file.id !== fileId))

        // Update selected file if necessary
        if (selectedFile?.id === fileId) {
          const remainingFiles = files.filter((file) => file.id !== fileId)
          setSelectedFile(remainingFiles.length > 0 ? remainingFiles[remainingFiles.length - 1] : null)
        }

        toast.success("File deleted successfully")
      } catch (error) {
        console.error("Error deleting file:", error)
        toast.error("Failed to delete file")
      }
    },
    [channelName, selectedFile, files],
  )

  return {
    files,
    isLoading,
    isUploading,
    uploadingFiles,
    selectedFile,
    newFileNotification,
    setSelectedFile,
    setNewFileNotification,
    handleFileUpload,
    handleDeleteFile,
    loadFiles,
  }
}

