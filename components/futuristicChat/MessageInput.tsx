"use client"

import type React from "react"

import { useState, useRef, Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, Send, X } from "lucide-react"
import { Message } from "@/types/message"


type MessageInputProps = {
  onSendMessage: (text: string, file?: { name: string; url: string }) => void
  onTyping: () => void
  replyingTo: Message | null
  setReplyingTo: Dispatch<SetStateAction<Message | null>>
}

export default function MessageInput({ onSendMessage, onTyping, replyingTo, setReplyingTo }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<{ name: string; url: string } | null>(null)

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() && !file) return

    onSendMessage(message, file || undefined)
    setMessage("")
    setFile(null)
  }

  // Trigger typing indicator
  const handleTyping = () => {
    onTyping()
  }

  return (
    <div className="p-1 shadow border-t border-cyan-900/30bg-black/60">
      {/* Reply indicator */}
      {replyingTo && (
        <div
          className="absolute -top-20 inset-x-0 mb-2 flex items-center justify-between p-2 bg-cyan-900/20 border border-cyan-900/30"
          style={{
            clipPath: "polygon(0 0, 100% 0, 98% 100%, 0 100%)",
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-1 h-full bg-cyan-500"></div>
            <div>
              <div className="text-[8px] font-mono text-cyan-400 uppercase tracking-wider">
                Replying to {replyingTo.sender}
              </div>
              <div className="text-[10px] text-gray-300 truncate max-w-[300px]">{replyingTo.text}</div>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-5 w-5 rounded-none hover:bg-cyan-900/30"
            onClick={() => setReplyingTo(null)}
          >
            <X className="h-3 w-3 text-cyan-400" />
          </Button>
        </div>
      )}

      {/* File attachment preview */}
      {file && (
        <div
          className="mb-2 flex items-center justify-between p-2  dark:bg-cyan-900/20 border dark:border-cyan-900/30"
          style={{
            clipPath: "polygon(0 0, 100% 0, 98% 100%, 0 100%)",
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="text-[10px] text-cyan-400 font-mono">{file.name}</div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-5 w-5 rounded-none hover:bg-cyan-900/30"
            onClick={() => setFile(null)}
          >
            <X className="h-3 w-3 text-cyan-400" />
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
              handleTyping()
            }}
            placeholder="Enter message..."
            className="w-full h-10 px-3 py-2 bg-black/50 border border-cyan-900/30 focus:border-cyan-500/50 rounded-none text-xs text-cyan-50 placeholder-cyan-800 resize-none"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* Digital circuit pattern */}
          <div
            className="absolute inset-0 opacity-5 -z-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H 90 V 90 H 10 L 10 10' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M30 10 V 30 H 10' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M70 10 V 30 H 90' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M30 90 V 70 H 10' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M70 90 V 70 H 90' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M10 50 H 30' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M70 50 H 90' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M50 10 V 30' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M50 70 V 90' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <Button
          type="submit"
          size="icon"
          className="h-10 w-10 rounded-none bg-cyan-900/30 hover:bg-cyan-800/50 border border-cyan-900/50"
          disabled={(!message.trim() && !file)}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 30% 100%, 0 70%)",
          }}
        >
          <Send className="h-4 w-4 text-cyan-400" />
        </Button>
      </form>
    </div>
  )
}
