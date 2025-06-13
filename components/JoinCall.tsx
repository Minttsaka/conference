"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getOrCreateUserId } from "@/lib/userGn"
import { Mic, MicOff, Camera, CameraOff, AlertCircle } from "lucide-react"
import { getMeeting } from "@/lib/api"
import { Meeting } from "@/types/clasroom"
import { SessionPayload } from "@/lib/session"
import NotExist from "./loading/NotExist"
import EarlyVisit from "./loading/EarlyVisit"
import LateVisit from "./loading/LateVisit"
import FuturisticLoading from "./loading/FuturisticLoading"
import { useSession } from "@/lib/client-session"

export default function JoinCall({ 
  id,
}: { 
  id: string,
  //  user:SessionPayload 
  }) {
  const [displayName, setDisplayName] = useState("")
  const [meeting, setMeeting] = useState<Meeting>()
  const [isGlitching, setIsGlitching] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [permissionError, setPermissionError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user, loading, logout } = useSession()

  useEffect(() => {
    if (!loading && !user) {
       if (!loading && !user) {
      // Use Next.js router for client-side navigation
      window.location.href = `http://localhost:3000/i/auth/${meeting}`
    }
    }
  }, [user, loading, id])

  const combineDateAndTime = (startDate: string | Date, startTime: string | Date): Date => {
    // Ensure we're working with Date objects
    const dateObj = new Date(startDate)
    const timeObj = new Date(startTime)

    // Create a new date with the date parts from startDate
    const combined = new Date(dateObj)

    // Set the time parts from startTime
    combined.setHours(timeObj.getHours(), timeObj.getMinutes(), timeObj.getSeconds(), timeObj.getMilliseconds())

    return combined
  }

  // Initialize camera and microphone
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        setIsLoading(true)

        // Fetch meeting data
        const response = await getMeeting(id)
        setMeeting(response.meeting)

        // Initialize media devices
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        setStream(mediaStream)

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }

        setPermissionError(null)
      } catch (error) {
        console.error("Error:", error)
        setPermissionError("Error accessing media devices or fetching meeting data.")
      } finally {
        setIsLoading(false)
      }
    }

    initializeMedia()

    if (user) {
      setDisplayName(user.name)
    }

    // Cleanup function to stop all tracks when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [id, user])

  // Show loading state while fetching meeting data
  if (isLoading) {
    return <FuturisticLoading />
  }

  // Show deleted state if meeting doesn't exist
  if (!meeting) {
    return <NotExist />
  }

  // Determine meeting status based on time
  const now = new Date()

  // Properly combine date and time
  const actualStartTime = combineDateAndTime(meeting.startDate, meeting.startTime)

  // Calculate end time
  const endTime = new Date(actualStartTime.getTime() + meeting.duration * 60000)

  // Determine which component to render based on meeting time
  if (now < actualStartTime) {
    // Meeting hasn't started yet
    return <EarlyVisit meetingTopic={meeting.topic} startTime={actualStartTime} timeZone={meeting.timeZone} />
  } else if (now > endTime) {
    // Meeting has ended
    return (
      <LateVisit
        meetingTopic={meeting.topic}
        duration={meeting.duration}
        endedAt={endTime}
        date={new Date(meeting.startDate)}
        participantCount={5} // This would come from participants array in a real app
      />
    )
  }

  const generateToken = async () => {
    try {
      const response = await fetch("/api/video-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelName: id, uid: getOrCreateUserId(user as SessionPayload), userRole: "student" }),
      })

      const data = await response.json()

      if (response.ok) {
        const token = encodeURIComponent(data.token)
        const url = `/demo/${id}?token=${token}`
        return url
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Error generating token:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = await generateToken()

    if (displayName.trim()) {
      if (url) {
        // Store camera and mic preferences
        localStorage.setItem("fusionCameraEnabled", meeting?.muteVideo.toString() as string)
        localStorage.setItem("fusionMicEnabled", meeting?.muteAudio.toString() as string)

        window.location.href = url
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.h1
          className="text-3xl mb-8 font-light tracking-widest text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {meeting?.topic}
        </motion.h1>

        {/* Video preview */}
        <motion.div
          className="relative mb-6 aspect-video bg-white/5 rounded-sm overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence>
            {permissionError ? (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
                <p className="text-xs text-red-300">{permissionError}</p>
              </motion.div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${!meeting?.muteVideo ? "hidden" : ""} ${isGlitching ? "glitch-video" : ""}`}
                />

                {!meeting?.muteVideo && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-xs text-white/50">Camera is off</p>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          {/* Video controls */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
            <motion.button
              type="button"
              className={`w-8 h-8 rounded-full flex items-center justify-center ${meeting?.muteAudio ? "bg-white/20" : "bg-red-500/50"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {meeting?.muteAudio ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </motion.button>

            <motion.button
              type="button"
              className={`w-8 h-8 rounded-full flex items-center justify-center ${meeting?.muteVideo ? "bg-white/20" : "bg-red-500/50"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {meeting?.muteVideo ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
            </motion.button>
          </div>

          {/* Scanlines effect */}
          <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10"></div>

          {/* Vignette effect */}
          <div className="absolute inset-0 pointer-events-none bg-vignette opacity-70"></div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <motion.input
              type="text"
              defaultValue={user ? user?.name : displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 px-1 text-xs tracking-wider focus:outline-none focus:border-white/50 transition-colors"
              placeholder={user ? user?.name : "Your identity"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              disabled={!!user}
            />
            <motion.span
              className="absolute bottom-0 left-0 w-full h-[1px] bg-white/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
          </div>
          <motion.button
            type="submit"
            className={`w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white text-xs tracking-widest transition-colors ${isGlitching ? "glitch" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!displayName.trim()}
          >
            Join
          </motion.button>
        </form>
        {meeting?.transcription &&  <motion.p
          className="mt-8 text-[8px] text-center text-white/50 max-w-[200px] mx-auto leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
            This meeting has voice transcription enabled.
            By joining, you consent to having your audio recorded and transcribed in real time.

            If you do not wish to be transcribed, please mute your microphone or leave the meeting.


          </motion.p>
           }
           {!meeting.muteVideo &&  <motion.p
          className="mt-8 text-[8px] text-center text-white/50 max-w-[200px] mx-auto leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
            This meeting has video muted on start.
            You can unmute once attending this meeting.


          </motion.p>
           }
           {!meeting.muteAudio &&  <motion.p
          className="mt-8 text-[8px] text-center text-white/50 max-w-[200px] mx-auto leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
            This meeting has audio muted on start.
            You can unmute once attending this meeting.


          </motion.p>
           }
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
        
        .glitch-video {
          animation: glitch 0.1s linear infinite;
          opacity: 0.9;
        }
        
        .bg-scanline {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 100%
          );
          background-size: 100% 4px;
        }
        
        .bg-vignette {
          background: radial-gradient(
            circle,
            transparent 60%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }
      `}</style>
    </div>
  )
}

