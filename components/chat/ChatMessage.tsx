import type { ChatMessageProps } from "@/types/video"

export function ChatMessage({ sender, image, message, timestamp }: ChatMessageProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-1">
        <img src={image || "/placeholder.svg"} alt={sender} className="w-6 h-6 rounded-full" />
        <span className="font-medium text-sm">{sender}</span>
        <span className="text-xs text-gray-400">{timestamp}</span>
      </div>
      <p className="text-sm text-gray-600 pl-8">{message}</p>
    </div>
  )
}

