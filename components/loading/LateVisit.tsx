"use client"

import { useState } from "react"
import { Clock, Download, Calendar, RefreshCw, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

type MeetingEndedProps = {
  meetingTopic: string
  duration: number
  endedAt: Date
  date: Date
  participantCount: number
}

export default function LateVisit({ meetingTopic, duration, endedAt, date, participantCount }: MeetingEndedProps) {
  const [pulseEffect, setPulseEffect] = useState(false)

  // Simulate pulse effect
  const triggerPulse = () => {
    setPulseEffect(true)
    setTimeout(() => setPulseEffect(false), 1000)
  }

  // Format duration as hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? hours + "h " : ""}${mins}m`
  }

  // Format time as HH:MM:SS
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* Background grid effect */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

      {/* Glowing orb */}
      <div
        className={cn(
          "absolute z-0 h-64 w-64 rounded-full bg-gradient-to-br from-red-500/20 to-cyan-500/20 blur-3xl transition-all duration-1000",
          pulseEffect ? "scale-110 opacity-70" : "scale-100 opacity-40",
        )}
      />

      <div className="z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-widest text-red-400">System Status</h3>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-green-400 to-zinc-700 bg-clip-text text-transparent">
              Meeting Ended
            </span>
          </h1>
          <p className="text-[10px] text-gray-400 max-w-md tracking-wider">
            "{meetingTopic}" has concluded. All participants have been disconnected from the session. 
          </p>
        </div>

        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-full border border-red-500/20" />
          <div className="absolute inset-1 rounded-full border border-violet-500/10" />
          <div className="absolute inset-2 rounded-full border border-red-500/5" />
          <Clock className="absolute h-6 w-6 text-red-400 opacity-20" />
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-wider text-white">{formatTime(endedAt)}</span>
            <span className="font-mono text-[8px] text-gray-400">{formatDate(date)}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] text-gray-400 tracking-wider">Meeting duration: {formatDuration(duration)}</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-red-500/50" />
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-red-500/50" />
            </div>
          </div>
          <Link href={'/'}>
            <Button
              variant="outline"
              className="h-8 w-full border-gray-800 bg-black/50 text-[10px] tracking-wider text-red-400 hover:bg-black/70 hover:text-red-300 group"
            >
              Return to Dashboard
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-2">
          <div className="flex space-x-1">
            <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
            <div className="h-1 w-1 rounded-full bg-violet-500 animate-pulse delay-75" />
            <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse delay-150" />
          </div>
          <p className="text-[8px] text-gray-500 tracking-widest uppercase">XTREME-REGION</p>
        </div>
      </div>
    </div>
  )
}
