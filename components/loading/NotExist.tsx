"use client"

import { useState } from "react"
import { AlertTriangle, Calendar, HelpCircle, Home, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function NotExist() {
  const [pulseEffect, setPulseEffect] = useState(false)

  // Simulate pulse effect
  const triggerPulse = () => {
    setPulseEffect(true)
    setTimeout(() => setPulseEffect(false), 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* Background grid effect */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

      {/* Glowing orb - red for error state */}
      <div
        className={cn(
          "absolute z-0 h-64 w-64 rounded-full bg-gradient-to-br from-red-600/20 to-orange-500/10 blur-3xl transition-all duration-1000",
          pulseEffect ? "scale-110 opacity-70" : "scale-100 opacity-30",
        )}
      />

      <div className="z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <h3 className="text-xs uppercase tracking-widest text-red-500">Not Exist</h3>
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Meeting Deleted
            </span>
          </h1>

          <p className="text-[10px] text-gray-400 max-w-md tracking-wider">
            The meeting you are attempting to access no longer exists in the system. It may have been deleted by the
            organizer or removed due to inactivity.
          </p>
        </div>

        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-full border border-red-500/30" />
          <div className="absolute inset-1 rounded-full border border-orange-500/20" />
          <div className="absolute inset-2 rounded-full border border-red-500/10" />

          {/* X mark for deleted */}
          <X className="absolute h-16 w-16 text-red-500/20" strokeWidth={1} />

          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <div className="space-y-6 w-full max-w-xs">

          <div className="grid grid-cols-2 gap-2">
            <Link href={''}
              className="flex flex-col items-center space-y-1 rounded-lg border border-gray-800 bg-black/50 p-3 backdrop-blur-sm hover:bg-black/70 cursor-pointer transition-colors"
              onClick={triggerPulse}
            >
              <Home className="h-3 w-3 text-gray-400" />
              <span className="text-[8px] tracking-wider">Return to Dashboard</span>
            </Link>

            <Link href={''}
              className="flex flex-col items-center space-y-1 rounded-lg border border-gray-800 bg-black/50 p-3 backdrop-blur-sm hover:bg-black/70 cursor-pointer transition-colors"
              onClick={triggerPulse}
            >
              <HelpCircle className="h-3 w-3 text-gray-400" />
              <span className="text-[8px] tracking-wider">Contact Support</span>
            </Link>

            <Link href={''}
              className="col-span-2 flex flex-col items-center space-y-1 rounded-lg border border-gray-800 bg-black/50 p-3 backdrop-blur-sm hover:bg-black/70 cursor-pointer transition-colors"
              onClick={triggerPulse}
            >
              <Calendar className="h-3 w-3 text-orange-400" />
              <span className="text-[8px] tracking-wider">Schedule New Meeting</span>
            </Link>
          </div>

          <Button
            variant="outline"
            className="h-8 w-full border-gray-800 bg-black/50 text-[10px] tracking-wider text-red-400 hover:bg-black/70 hover:text-red-300"
            onClick={triggerPulse}
          >
            Refresh Status
          </Button>
        </div>

        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex space-x-1">
            <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
            <div className="h-1 w-1 rounded-full bg-orange-500 animate-pulse delay-75" />
            <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse delay-150" />
          </div>

          <div className="flex items-center space-x-1">
            <div className="h-px w-8 bg-red-900/30" />
            <p className="text-[8px] text-gray-500 tracking-widest uppercase">Error Code: E-404-MTG</p>
            <div className="h-px w-8 bg-red-900/30" />
          </div>

          <p className="text-[8px] text-gray-600 tracking-widest">System v.2.0.45</p>
        </div>
      </div>
    </div>
  )
}
