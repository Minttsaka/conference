"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { getOrCreateUserId } from "@/lib/userGn"
import { toast } from "react-hot-toast"
import { nanoid } from "nanoid"

export default function CreateMeeting() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  const generateToken = async (meetingId: string) => {
    try {
      const response = await fetch("/api/video-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelName: meetingId, uid: getOrCreateUserId(), userRole: "host" }),
      })

      const data = await response.json()

      if (response.ok) {
        const token = encodeURIComponent(data.token)
        const meetingTitle = encodeURIComponent(title)
        const meetingDescription = encodeURIComponent(description)
        const url = `/demo/${meetingId}?token=${token}&t=${meetingTitle}&dc=${meetingDescription}`
        return url
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Error generating token:", error)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    localStorage.setItem("fusionUserName", displayName.trim())

    try {
      const meetingId = nanoid(10) // Generate a unique 10-character meeting ID
      const link = await generateToken(meetingId)
      toast.success("Meeting created successfully")
      link ? window.location.href = link : router.push("/")
    } catch (error) {
      toast.error("Failed to create meeting")
    } finally {
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
          Create a Meeting
        </motion.h1>
        <form onSubmit={handleCreate} className="space-y-6">
          <InputField value={displayName} onChange={setDisplayName} placeholder="Your name" />
          <InputField value={title} onChange={setTitle} placeholder="Meeting title" />
          <InputField value={description} onChange={setDescription} placeholder="Meeting description" />
          <motion.button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs tracking-widest transition-colors ${isGlitching ? "glitch" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Meeting"}
          </motion.button>
        </form>
        <motion.p
          className="mt-8 text-[10px] text-center text-gray-400 max-w-[300px] mx-auto leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          By creating a meeting, you agree to our terms of service and privacy policy. Please ensure all participants
          are informed of the meeting details.
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

