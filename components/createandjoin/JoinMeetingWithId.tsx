"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getMeeting } from "@/lib/api"
import { toast } from "sonner"

export default function JoinMeetingWithId() {

  const [meetingId, setMeetingId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

   const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setHasError(false)

    // Check for empty input first
    if (!meetingId.trim()) {
      toast("Please enter a meeting ID")
      setIsLoading(false)
      setHasError(true)
      return
    }

    try {
      const meeting = await getMeeting(meetingId)
      setHasSubmitted(true)

      console.log("meeting", meeting)

      if (!meeting.meeting) {
        setHasError(true)
        toast("Invalid meeting ID")
        setIsLoading(false)
        return
      } else {
        // Success case
        const link = `/join/${meetingId}`
        toast.success("Joining meeting...")
        window.location.href = link
      }

    } catch (error) {
      setHasError(true)
      toast("Failed to join meeting")
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.h1
          className="text-3xl mb-8 font-light tracking-widest text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Join a Meeting
        </motion.h1>
        <form onSubmit={handleJoin} className="space-y-6">
          <InputField value={meetingId} onChange={setMeetingId} placeholder="Meeting ID" />
          <motion.button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs tracking-widest transition-colors ${isGlitching ? "glitch" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Joining..." : "Join Meeting"}
          </motion.button>
        </form>
        {hasSubmitted &&
        (hasError ? (
          <motion.p
            className="mt-8 text-[10px] text-center text-red-400 max-w-[300px] mx-auto leading-loose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Invalid meeting ID or connection failed!
          </motion.p>
        ) : (
          <motion.p
            className="mt-8 text-[10px] text-center text-green-400 max-w-[300px] mx-auto leading-loose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Success! Redirecting to meeting...
          </motion.p>
        ))}
        <motion.p
          className="mt-8 text-[10px] text-center text-gray-400 max-w-[300px] mx-auto leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          By joining a meeting, you agree to our terms of service and privacy policy. Please ensure you have permission
          to join this meeting.
        </motion.p>
      </div>
      <style jsx global>{`
        @keyframes glitch {
          0% {
            transform: translate(0)
          }
          20% {
            transform: translate(-2px, 2px)
          }
          40% {
            transform: translate(-2px, -2px)
          }
          60% {
            transform: translate(2px, 2px)
          }
          80% {
            transform: translate(2px, -2px)
          }
          100% {
            transform: translate(0)
          }
        }
        .glitch {
          animation: glitch 0.2s linear infinite;
        }
      `}</style>
    </div>
  )
}

function InputField({
  value,
  onChange,
  placeholder,
}: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <div className="relative">
      <motion.input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-gray-600 py-2 px-1 text-sm tracking-wider focus:outline-none focus:border-blue-400 transition-colors"
        placeholder={placeholder}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
    </div>
  )
}

