"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import {
  Folder,
  Upload,
  File,
  FilePlus,
  Download,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ExternalLink,
  Loader2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { FileCard } from "./FileCard"
import { FileUploadCard } from "./FileUploadCard"
import { NewFileNotification } from "./NewFileNotification"
import { FileViewer } from "./FileViewer"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FileItem } from "@/types/clasroom"
import { uploadTos3 } from "@/lib/aws"
import { getFiles } from "@/lib/api"
import { publishMessage } from "../demo/agora"
import { SessionPayload } from "@/lib/session"

interface FilesDialogProps {
  isOpen: boolean
  onClose: () => void
  rtm:any
  user:SessionPayload
  channelName:string
  userId: string
  userName: string
}

export function FilesDialog({ isOpen, onClose,channelName,rtm, user, userId, userName }: FilesDialogProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [uploadingFiles, setUploadingFiles] = useState<
    {
      id: string
      file: File
      progress: number
      status: "uploading" | "success" | "error"
      error?: string
    }[]
  >([])
  const [searchQuery, setSearchQuery] = useState("")
  const [newFileNotification, setNewFileNotification] = useState<{
    isVisible: boolean
    file: FileItem | null
  }>({
    isVisible: false,
    file: null,
  })
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [isFileListCollapsed, setIsFileListCollapsed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([])
   const [isLoading, setIsLoading] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null) 
  const eventListenersSet = useRef(false)

     const loadFiles = async () => {
        try {
          console.log('loading the files...')
          const response = await getFiles(channelName)
          console.log('done loading the files...')
    
        if(response.success){
          setFiles(() => [...response.data]);
        }
          
        } catch (error) {
          
        }
      }
  
     
  
    useEffect(() => {
      setIsLoading(true)
      loadFiles()
      setIsLoading(false)
    }, [isOpen])

    useEffect(() => {
        if (!rtm) return
    
          // Presence event handler
        const handlePresence = (event: any) => {
          if (event.eventType === "SNAPSHOT") {
            console.log("Joined channel:", channelName)
          } else {
            console.log(`${event.publisher} is ${event.type}`)
          }
        }
    
        // Status event handler
        const handleStatus = (event: any) => {
          console.log("RTM status changed:", event.state, event.reason)
        }
    
        // Add event listeners
        rtm.addEventListener("message", async(event) => {
          console.log("message list",event.publisher, event.message);
    
          try {
            const messageData = JSON.parse(event.message)
            console.log("Received message:", messageData)
    
            if (messageData.type === "file") {
              
              loadFiles()
            } 
          } catch (error) {
            console.error("Error parsing message:", error)
          }
        })
        rtm.addEventListener("presence", handlePresence)
        rtm.addEventListener("status", handleStatus)
    
        eventListenersSet.current = true
    
        // Cleanup function
        return () => {
          if (rtm) {
            rtm.removeEventListener("message",event => {
          console.log("message list",event.publisher, event.message);
        })
            rtm.removeEventListener("presence", handlePresence)
            rtm.removeEventListener("status", handleStatus)
          }
        }
      }, [rtm, channelName,isOpen])

  // Select the first file when files are loaded or changed
  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[files.length - 1])
    }
  }, [files, selectedFile,isOpen])

  // Filter files based on active tab and search query
  const filteredFiles = files?.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "images") return file.type.startsWith("image/") && matchesSearch
    if (activeTab === "documents")
      return (
        (file.type.includes("pdf") ||
          file.type.includes("doc") ||
          file.type.includes("txt") ||
          file.type.includes("sheet") ||
          file.type.includes("presentation") ||
          file.type.includes("powerpoint") ||
          file.name.endsWith(".pptx") ||
          file.name.endsWith(".ppt")) &&
        matchesSearch
      )
    if (activeTab === "media")
      return (file.type.startsWith("video/") || file.type.startsWith("audio/")) && matchesSearch
    return matchesSearch
  })

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

   try {
    setIsUploading(true)
    const selectedFiles = event.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    const uploadedFiles: { type: string ;name: string; url: string }[] = [];

    for (const file of selectedFiles) {

      const response = await uploadTos3(file);

      const formattedData = {
        type: file.type,
        name: response?.fileName as string,
        url: response?.url || "",
      };

      uploadedFiles.push(formattedData);
    }

    console.log('files to send', uploadedFiles)

    if(uploadedFiles.length > 0){

        const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/api/files/${channelName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uploader:userName,
            files:uploadedFiles
          }),
        });

        if (!rtm) return

          await publishMessage(rtm, `${channelName}file`, files)

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

      }
   } catch (error) {
    
   } finally {
    setIsUploading(false)
   }
  }


   if (isLoading) {
        return (
          <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Connecting to chat...</p>
            </div>
          </div>
        )
      }
    

  // Get file type from extension if MIME type is not available
  const getFileTypeFromExtension = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase() || ""

    const mimeTypes: Record<string, string> = {
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      svg: "image/svg+xml",
      mp4: "video/mp4",
      webm: "video/webm",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      txt: "text/plain",
      csv: "text/csv",
      html: "text/html",
      js: "text/javascript",
      json: "application/json",
      xml: "application/xml",
    }

    return mimeTypes[ext] || "application/octet-stream"
  }

  // Handle file deletion
  const handleDeleteFile = (fileId: string) => {
    // If the deleted file is the selected file, select another file
    if (selectedFile && selectedFile.id === fileId) {
      const fileIndex = files.findIndex((file) => file.id === fileId)
      if (fileIndex > 0) {
        setSelectedFile(files[fileIndex - 1])
      } else if (files.length > 1) {
        setSelectedFile(files[1])
      } else {
        setSelectedFile(null)
      }
    }

  }

  // Focus on new file when notification is clicked
  const handleFocusOnNewFile = (fileId: string) => {
    setNewFileNotification({ isVisible: false, file: null })

    // Find and select the file
    const file = files.find((f) => f.id === fileId)
    if (file) {
      setSelectedFile(file)
    }

    // Find the file element and scroll to it
    setTimeout(() => {
      const fileElement = document.getElementById(`file-${fileId}`)
      if (fileElement) {
        fileElement.scrollIntoView({ behavior: "smooth", block: "center" })
        fileElement.classList.add("highlight-pulse")
        setTimeout(() => {
          fileElement.classList.remove("highlight-pulse")
        }, 2000)
      }
    }, 100)
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Toggle file list collapse
  const toggleFileList = () => {
    setIsFileListCollapsed(!isFileListCollapsed)
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => !open && onClose()}
        className={isFullscreen ? "fixed inset-0 z-50" : ""}
      >
      <DialogTitle>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Folder className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-medium">Shared Files</h2>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
            </div>
          </div>
      </DialogTitle>
      <DialogDescription></DialogDescription>
        <DialogContent
          className={cn(
            "flex flex-col p-0 gap-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl",
            isFullscreen ? "max-w-none w-screen h-screen rounded-none border-0" : "sm:max-w-5xl max-h-[90vh]",
          )}
        >
          {/* Header */}
          

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* File list section */}
            <AnimatePresence initial={false}>
              {!isFileListCollapsed && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "350px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col border-r border-gray-200 dark:border-gray-800 h-full"
                >
                  {/* Search and upload */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search files..."
                        className="pl-9 bg-gray-100/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />
                      {!isUploading ? <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button> :
                      <Loader2  className="animate-spin text-white" />
                      }
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="px-4">
                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="images">Images</TabsTrigger>
                        <TabsTrigger value="documents">Docs</TabsTrigger>
                        <TabsTrigger value="media">Media</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Files list */}
                  <ScrollArea className="flex-1">
                    <div className="space-y-4 p-4">
                      {/* Uploading files */}
                      {uploadingFiles.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Uploading</h3>
                          <div className="space-y-2">
                            {uploadingFiles.map((item) => (
                              <FileUploadCard
                                key={item.id}
                                file={item.file}
                                progress={item.progress}
                                status={item.status}
                                error={item.error}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Files list */}
                      {filteredFiles.length > 0 ? (
                        <div className="space-y-2">
                          {filteredFiles.map((file) => (
                            <div
                              key={file.id}
                              id={`file-${file.id}`}
                              onClick={() => setSelectedFile(file)}
                              className={cn(
                                "cursor-pointer transition-all duration-200",
                                file.createdAt === new Date() && "animate-pulse-subtle",
                              )}
                            >
                              <FileCard
                                file={file}
                                onDelete={() => handleDeleteFile(file.id)}
                                isCurrentUser={file.uploader === userId}
                                isSelected={selectedFile?.id === file.id}
                                isCompact={true}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <FilePlus className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">No files found</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {searchQuery ? "Try a different search term" : "Upload files to share with participants"}
                          </p>
                          {!searchQuery && (
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mt-4">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Files
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>

            {/* File viewer section */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Viewer header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" onClick={toggleFileList} className="mr-2">
                    {isFileListCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>

                  {selectedFile ? (
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium truncate max-w-[300px]" title={selectedFile.name}>
                        {selectedFile.name}
                      </h3>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Shared by {selectedFile.uploader}
                      </span>
                    </div>
                  ) : (
                    <h3 className="text-sm font-medium">No file selected</h3>
                  )}
                </div>

                {selectedFile && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const a = document.createElement("a")
                        a.href = selectedFile.url
                        a.download = selectedFile.name
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.open(selectedFile.url, "_blank")}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  </div>
                )}
              </div>

              {/* File viewer */}
              <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                {selectedFile ? (
                  <FileViewer file={selectedFile} />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <File className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No file selected</h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Select a file from the list or upload a new one
                      </p>
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mt-4">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New file notification */}
      <AnimatePresence>
        {newFileNotification.isVisible && newFileNotification.file && (
          <NewFileNotification
            file={newFileNotification.file}
            onView={() => handleFocusOnNewFile(newFileNotification.file!.id)}
            onClose={() => setNewFileNotification({ isVisible: false, file: null })}
          />
        )}
      </AnimatePresence>
    </>
  )
}

