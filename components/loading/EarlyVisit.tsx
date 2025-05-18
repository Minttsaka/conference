"use client"

import { useState, useEffect } from "react"
import { Clock, Bell, BellOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

// Update the props type to ensure startTime is always a Date object
type MeetingWaitingProps = {
  meetingTopic: string
  startTime: Date
  timeZone: string
}

export default function EarlyVisit({ meetingTopic, startTime, timeZone }: MeetingWaitingProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [notifications, setNotifications] = useState(false)
  const [pulseEffect, setPulseEffect] = useState(false)

  // Update the useEffect to handle the startTime properly
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const meetingTime = new Date(startTime) // Ensure it's a Date object
      const diffMs = meetingTime.getTime() - now.getTime()

      if (diffMs <= 0) {
        // Time to start the meeting
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      // Calculate hours, minutes, seconds
      const hours = Math.floor(diffMs / (1000 * 60 * 60))
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

      setTimeRemaining({ hours, minutes, seconds })

      // Create pulse effect every 10 seconds
      if (seconds % 10 === 0) {
        setPulseEffect(true)
        setTimeout(() => setPulseEffect(false), 1000)
      }
    }

    // Calculate immediately
    calculateTimeRemaining()

    // Then update every second
    const timer = setInterval(calculateTimeRemaining, 1000)
    return () => clearInterval(timer)
  }, [startTime])

  const formattedTime = `${timeRemaining.hours.toString().padStart(2, "0")}:${timeRemaining.minutes.toString().padStart(2, "0")}:${timeRemaining.seconds.toString().padStart(2, "0")}`

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* Background grid effect */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

      {/* Glowing orb */}
      <div
        className={cn(
          "absolute z-0 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl transition-all duration-1000",
          pulseEffect ? "scale-110 opacity-70" : "scale-100 opacity-40",
        )}
      />

      <div className="z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-widest text-cyan-400">System Status</h3>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Meeting Pending
            </span>
          </h1>
          <p className="text-[10px] text-gray-400 max-w-md tracking-wider">
            Your scheduled meeting "{meetingTopic}" has not yet started. 
          </p>
        </div>

        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-1 rounded-full border border-violet-500/10" />
          <div className="absolute inset-2 rounded-full border border-cyan-500/5" />
          <Clock className="absolute h-6 w-6 text-cyan-400 opacity-20" />
          <span className="font-mono text-xl font-bold tracking-wider text-white">{formattedTime}</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] text-gray-400 tracking-wider">Estimated time until meeting begins</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <RefreshCw className="h-3 w-3 animate-spin text-cyan-400" />
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-2">
          <div className="flex space-x-1">
            <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
            <div className="h-1 w-1 rounded-full bg-violet-500 animate-pulse delay-75" />
            <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse delay-150" />
          </div>
          <p className="text-[8px] text-gray-500 tracking-widest uppercase">XTREME-REGION</p>
        </div>
      </div>
    </div>
  )
}
