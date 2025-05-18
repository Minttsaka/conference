"use client"

import { useState } from "react"
import {
  Bell,
  Check,
  ChevronLeft,
  Link2,
  Mic,
  MicOff,
  Monitor,
  MoreHorizontal,
  Phone,
  Send,
  Video,
  VideoOff,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function VideoConference() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [activeTab, setActiveTab] = useState<"participants" | "chat">("participants")

  return (
    <div className="w-full h-screen bg-white flex flex-col rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F4F4FF]">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <Video className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Project - Weekly Meting</h1>
              <p className="text-sm text-muted-foreground">Sam's meeting room</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="rounded-full gap-2">
            <Link2 className="h-4 w-4" />
            Copy link
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-0e583eed02c7ca66b3283ae0659dbd40-S6oOUkYN7xtYNFoCSOWchXmzvFdCPo.webp" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Main Video */}
          <div className="relative flex-1 rounded-2xl bg-gray-100 overflow-hidden mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-0e583eed02c7ca66b3283ae0659dbd40-S6oOUkYN7xtYNFoCSOWchXmzvFdCPo.webp"
              alt="Main video feed"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full text-white">
              <div className="h-2 w-2 bg-red-500 rounded-full" />
              Recording
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="icon" variant="secondary" className="rounded-full bg-white/90">
                <Monitor className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full bg-white/90">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <Button
                size="icon"
                variant={isMuted ? "destructive" : "secondary"}
                className="rounded-full h-12 w-12"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button size="icon" variant="destructive" className="rounded-full h-14 w-14">
                <Phone className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant={isVideoOff ? "destructive" : "secondary"}
                className="rounded-full h-12 w-12"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Participant Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative flex-shrink-0 rounded-xl overflow-hidden w-48 h-28">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-0e583eed02c7ca66b3283ae0659dbd40-S6oOUkYN7xtYNFoCSOWchXmzvFdCPo.webp"
                  alt={`Participant ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-0e583eed02c7ca66b3283ae0659dbd40-S6oOUkYN7xtYNFoCSOWchXmzvFdCPo.webp" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-white font-medium">Anderson</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l">
          <div className="flex">
            <button
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium border-b-2",
                activeTab === "participants"
                  ? "border-indigo-500 text-indigo-500"
                  : "border-transparent text-muted-foreground",
              )}
              onClick={() => setActiveTab("participants")}
            >
              Participants (5)
            </button>
            <button
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium border-b-2",
                activeTab === "chat" ? "border-indigo-500 text-indigo-500" : "border-transparent text-muted-foreground",
              )}
              onClick={() => setActiveTab("chat")}
            >
              Room Chat
            </button>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">In call</h3>
              <div className="space-y-3">
                {[
                  { name: "Alex Graychan", role: "Host" },
                  { name: "Sofia Daniel", role: "Moderator" },
                  { name: "Vijay Varma", role: "Moderator" },
                  { name: "Daniel Miller", role: "Moderator" },
                ].map((participant) => (
                  <div key={participant.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-0e583eed02c7ca66b3283ae0659dbd40-S6oOUkYN7xtYNFoCSOWchXmzvFdCPo.webp" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Waiting room</h3>
              <div className="space-y-3">
                {[{ name: "Thosmas Dev" }, { name: "Kethria Paul" }].map((participant) => (
                  <div key={participant.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-0e583eed02c7ca66b3283ae0659dbd40-S6oOUkYN7xtYNFoCSOWchXmzvFdCPo.webp" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">{participant.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <X className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500">
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {activeTab === "chat" && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <input
                  type="text"
                  placeholder="Type Message"
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
                <Button size="icon" className="rounded-full bg-indigo-500 hover:bg-indigo-600">
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

