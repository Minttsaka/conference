"use client"
import { motion } from "framer-motion"
import { Reply, Smile, ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatTime, getInitials } from "@/lib/utils"
import Picker from "emoji-picker-react"

type MessageProps = {
  message: {
    id: string
    sender: string
    text: string
    timestamp: Date
    isCurrentUser: boolean
    reactions: { emoji: string; userId: string }[]
    replyTo?: string
    replyToSender?: string
    file?: {
      name: string
      url: string
    }
  }
  index: number
  setReplyingTo: (message: any) => void
  addReaction: (messageId: string, emoji: string) => void
}

export default function MessageBubble({ message, index, setReplyingTo, addReaction }: MessageProps) {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div className="flex gap-2 group">
        {!message.isCurrentUser && (
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-sm"></div>
            <Avatar className="h-8 w-8 mt-1 border border-cyan-500/50 relative z-10">
              <AvatarFallback className="bg-black text-xs font-mono">{getInitials(message.sender)}</AvatarFallback>
            </Avatar>
            <div className="absolute h-12 w-1 -bottom-4 left-4 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          </div>
        )}

        <div className="flex flex-col">
          {/* Sender name above message for current user */}
          {message.isCurrentUser && (
            <div className="text-right font-mono text-[8px] mb-1 text-cyan-400/80 pr-1 tracking-wider uppercase">
              {message.sender}
            </div>
          )}

          <div
            className={`p-3.5 relative ${
              message.isCurrentUser ? "bg-black/80 text-cyan-50 shadow-lg" : "bg-black/80 text-cyan-50 shadow-lg"
            }`}
            style={{
              clipPath: message.isCurrentUser
                ? "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)",
              backdropFilter: "blur(12px)",
              borderTop: message.isCurrentUser
                ? "1px solid rgba(6, 182, 212, 0.5)"
                : "1px solid rgba(6, 182, 212, 0.3)",
              borderLeft: !message.isCurrentUser ? "1px solid rgba(6, 182, 212, 0.3)" : "none",
              borderRight: message.isCurrentUser ? "1px solid rgba(6, 182, 212, 0.3)" : "none",
            }}
          >
            {/* Glowing border effect */}
            <div
              className="absolute inset-0 -z-10 opacity-30"
              style={{
                background: message.isCurrentUser
                  ? "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(14, 165, 233, 0.2))"
                  : "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1))",
                boxShadow: message.isCurrentUser
                  ? "0 0 15px rgba(6, 182, 212, 0.3)"
                  : "0 0 10px rgba(6, 182, 212, 0.2)",
              }}
            ></div>

            {/* Digital circuit pattern */}
            <div
              className="absolute inset-0 opacity-5 -z-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H 90 V 90 H 10 L 10 10' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M30 10 V 30 H 10' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M70 10 V 30 H 90' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M30 90 V 70 H 10' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M70 90 V 70 H 90' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M10 50 H 30' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M70 50 H 90' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M50 10 V 30' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3Cpath d='M50 70 V 90' fill='none' stroke='%2306b6d4' strokeWidth='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            ></div>

            {/* Sender name inside message for non-current user */}
            {!message.isCurrentUser && (
              <div className="font-mono text-[8px] mb-1.5 text-cyan-400 uppercase tracking-wider">
                {message.sender}
                <div className="h-px w-12 bg-gradient-to-r from-cyan-500/50 to-transparent mt-1"></div>
              </div>
            )}

            {message.replyTo && (
              <div
                className="mb-2.5 p-2.5 text-[10px] text-cyan-100 border-l border-cyan-400"
                style={{
                  background: "rgba(6, 182, 212, 0.1)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div className="font-mono text-[8px] text-cyan-400 uppercase tracking-wider">
                  {message.replyToSender}
                </div>
                <div className="truncate mt-1">{message.replyTo}</div>
              </div>
            )}

            <p className="leading-relaxed text-[10px] break-words whitespace-pre-wrap max-w-[300px] font-light">
              {message.text}
            </p>

            {message.file && (
              <div
                className="mt-2.5 p-2 flex items-center gap-2 rounded-none"
                style={{
                  background: "rgba(6, 182, 212, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-sm"></div>
                  <ImageIcon className="h-3 w-3 text-cyan-300 relative z-10" />
                </div>
                <a
                  href={message.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-white text-[10px] font-mono underline transition-colors"
                >
                  {message.file.name}
                </a>
              </div>
            )}

            <div className="text-[8px] mt-1.5 font-mono text-cyan-500/70 tracking-wider">
              {formatTime(message.timestamp)}
              <div className="inline-block h-px w-2 bg-cyan-500/50 mx-1 align-middle"></div>
              <span className="text-cyan-500/40">ID:{message.id.substring(0, 4)}</span>
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute -bottom-2 left-0 flex gap-1"
            >
              {message.reactions.length > 0 && (
                <div
                  className="px-2 py-0.5 text-[10px] z-50 flex items-center gap-1"
                  style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
                  }}
                >
                  {Array.from(new Set(message.reactions.map((r) => r.emoji))).map((emoji) => (
                    <span key={emoji}>{emoji}</span>
                  ))}
                  <span className="text-cyan-400 ml-1 font-mono">{message.reactions.length}</span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute right-0 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-50"
            >
              <div className="flex flex-col gap-1.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-5 w-5 rounded-none backdrop-blur-sm hover:bg-cyan-500/20 transition-all duration-200"
                        style={{
                          background: "rgba(0, 0, 0, 0.7)",
                          border: "1px solid rgba(6, 182, 212, 0.3)",
                          clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
                        }}
                        onClick={() => setReplyingTo(message)}
                      >
                        <Reply className="h-2.5 w-2.5 text-cyan-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="bg-black/90 border-cyan-500/30 text-[8px] font-mono text-cyan-400"
                    >
                      <p>REPLY</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-5 w-5 rounded-none backdrop-blur-sm hover:bg-cyan-500/20 transition-all duration-200"
                      style={{
                        background: "rgba(0, 0, 0, 0.7)",
                        border: "1px solid rgba(6, 182, 212, 0.3)",
                        clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
                      }}
                    >
                      <Smile className="h-2.5 w-2.5 text-cyan-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 border-cyan-900 bg-black/90 backdrop-blur-xl shadow-xl"
                    side="left"
                  >
                    {/* <Picker onEmojiSelect={(emoji: any) => addReaction(message.id, emoji.native)} /> */}
                  </PopoverContent>
                </Popover>
              </div>
            </motion.div>
          </div>
        </div>

        {message.isCurrentUser && (
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-sm"></div>
            <Avatar className="h-8 w-8 mt-1 border border-cyan-500/50 relative z-10">
              <AvatarFallback className="bg-black text-xs font-mono">{getInitials(message.sender)}</AvatarFallback>
            </Avatar>
            <div className="absolute h-12 w-1 -bottom-4 right-4 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
