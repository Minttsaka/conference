export interface FileItem {
  id: string
  uploader: string
  name: string
  type: string
  url: string
  meetingId: string
  createdAt: Date
  updatedAt: Date
}

export interface UploadingFile {
  id: string
  file: File
  progress: number
  status: "uploading" | "success" | "error"
  error?: string
}

export interface FileNotification {
  isVisible: boolean
  file: FileItem | null
}

export type FileTab = "all" | "images" | "documents" | "media"
