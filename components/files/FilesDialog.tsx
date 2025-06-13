"use client"

import type React from "react"

import { useState, useRef } from "react"
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
import { SessionPayload } from "@/lib/session"
import { useFileManager } from "@/hook/use-file-manager"

interface FilesDialogProps {
  isOpen: boolean
  onClose: () => void
  rtm:any
  user:SessionPayload
  channelName:string
  userId: string
  userName: string
}

export function FilesDialog({ isOpen, onClose,channelName,rtm, userId, userName }: FilesDialogProps) {
 
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFileListCollapsed, setIsFileListCollapsed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    files,
    isUploading,
    uploadingFiles,
    selectedFile,
    newFileNotification,
    setSelectedFile,
    setNewFileNotification,
    handleFileUpload,
    handleDeleteFile,
  } = useFileManager({ rtm, channelName, userName, isOpen })

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())

    switch (activeTab) {
      case "images":
        return file.type.startsWith("image/") && matchesSearch
      case "documents":
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
      case "media":
        return (file.type.startsWith("video/") || file.type.startsWith("audio/")) && matchesSearch
      default:
        return matchesSearch
    }
  })

  // Handle file input change
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      handleFileUpload(files)
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle focus on new file notification
  const handleFocusOnNewFile = (fileId: string) => {
    setNewFileNotification({ isVisible: false, file: null })

    const file = files.find((f) => f.id === fileId)
    if (file) {
      setSelectedFile(file)
    }

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleFileList = () => {
    setIsFileListCollapsed(!isFileListCollapsed)
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => !open && onClose()}
      >
      
        <DialogContent
          className={cn(
            "flex flex-col p-0 gap-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl",
            isFullscreen ? "max-w-none w-screen h-screen rounded-none border-0" : "sm:max-w-5xl max-h-[90vh]",
          )}
        >
          {/* Header */}
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
                      <input type="file" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" multiple />
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

