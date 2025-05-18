"use client"

import { useState, useEffect } from "react"
import { Loader2, RefreshCw, Signal, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FuturisticLoading() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingStep, setLoadingStep] = useState(0)
  const [pulseEffect, setPulseEffect] = useState(false)

  // Loading steps
  const loadingSteps = [
    "Establishing connection...",
    "Authenticating credentials...",
    "Locating meeting data...",
    "Initializing meeting environment...",
    "Preparing secure channel...",
  ]

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 3
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Update loading step based on progress
  useEffect(() => {
    const stepIndex = Math.min(Math.floor(loadingProgress / (100 / loadingSteps.length)), loadingSteps.length - 1)
    setLoadingStep(stepIndex)
  }, [loadingProgress, loadingSteps.length])

  // Pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true)
      setTimeout(() => setPulseEffect(false), 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* Background grid effect */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

      {/* Glowing orb - cyan for loading state */}
      <div
        className={cn(
          "absolute z-0 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-500/10 blur-3xl transition-all duration-1000",
          pulseEffect ? "scale-110 opacity-70" : "scale-100 opacity-30",
        )}
      />

      <div className="z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <h3 className="text-xs uppercase tracking-widest text-cyan-500">System Status</h3>
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-400 bg-clip-text text-transparent">
              Locating Meeting
            </span>
          </h1>

          <p className="text-[10px] text-gray-400 max-w-md tracking-wider">
            Please wait while the system locates and prepares your meeting environment. This process may take a few
            moments.
          </p>
        </div>

        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-pulse" />
          <div className="absolute inset-1 rounded-full border border-blue-500/20" />
          <div className="absolute inset-2 rounded-full border border-cyan-500/10" />

          {/* Loading spinner */}
          <Loader2 className="absolute h-16 w-16 text-cyan-500/20 animate-spin" strokeWidth={1} />

          {/* Progress percentage */}
          <div className="flex flex-col items-center">
            <span className="font-mono text-xl font-bold tracking-wider text-white">
              {Math.min(Math.round(loadingProgress), 100)}%
            </span>
            <span className="text-[8px] text-cyan-400 animate-pulse">SCANNING</span>
          </div>
        </div>

        <div className="space-y-6 w-full max-w-xs">
          {/* Loading step indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <Signal className="h-3 w-3 text-cyan-500" />
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>

            <div className="rounded-md border border-cyan-900/50 bg-cyan-950/20 p-3">
              <p className="text-[10px] text-cyan-400 tracking-wider font-mono">{loadingSteps[loadingStep]}</p>

              {/* Loading dots */}
              <div className="flex justify-center mt-2 space-x-1">
                <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
                <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse delay-150" />
                <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse delay-300" />
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[8px] text-gray-500 tracking-wider">Connection Status</span>
              <div className="flex items-center">
                <Wifi className="h-2 w-2 text-cyan-400 mr-1" />
                <span className="text-[8px] font-mono text-cyan-400">SECURE</span>
              </div>
            </div>
            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(loadingProgress, 100)}%` }}
              />
            </div>
          </div>

          {/* Loading segments */}
          <div className="grid grid-cols-5 gap-1">
            {[0, 1, 2, 3, 4].map((segment) => (
              <div
                key={segment}
                className={cn(
                  "h-1 rounded-full transition-colors duration-300",
                  loadingStep >= segment ? "bg-cyan-500" : "bg-gray-800",
                )}
              />
            ))}
          </div>

          {/* Simulated server response */}
          <div className="rounded-md border border-gray-800 bg-black/50 p-2">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-2 w-2 text-cyan-500 animate-spin" />
              <span className="text-[8px] text-gray-400 tracking-wider font-mono">
                srv_response: <span className="text-cyan-400">200_OK</span>
              </span>
            </div>
            <div className="mt-1 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500/30 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex space-x-1">
            <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
            <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse delay-75" />
            <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse delay-150" />
          </div>

          <div className="flex items-center space-x-1">
            <div className="h-px w-8 bg-cyan-900/30" />
            <p className="text-[8px] text-gray-500 tracking-widest uppercase">XTREME-REGION</p>
            <div className="h-px w-8 bg-cyan-900/30" />
          </div>
        </div>
      </div>
    </div>
  )
}
