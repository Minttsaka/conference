"use client"

import type React from "react"

import { useState, useEffect, SetStateAction, Dispatch } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Clock, MessageSquare, Folder, BarChart2, Settings, Users, Atom, FileAudio, Presentation } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { TranscriptionDialog } from "./TranscriptionDialog"
import { FilesDialog } from "../files/FilesDialog"
import { FileItem } from "@/types/clasroom"
import { SessionPayload } from "@/lib/session"
import { initializeAgoraRTM } from "../demo/agora"

interface DimensionalSidebarProps {
  isChatOpen: boolean
  user:SessionPayload
  classes:boolean
  transcription:boolean
  setIsChatOpen: (open: boolean) => void
  setIsSlidesOpen: Dispatch<SetStateAction<boolean>>
  onRequestTranscription?: (enabled: boolean) => void
  channel:string
}

export function DimensionalSidebar({ 
  user,
  isChatOpen,
  channel,
  transcription, 
  classes,
  setIsSlidesOpen,
  setIsChatOpen, 
  onRequestTranscription
}: DimensionalSidebarProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [activeIcon, setActiveIcon] = useState<string>("logo")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particleCount, setParticleCount] = useState(0)
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; color: string; duration: number }>
  >([])
  const [isTranscriptionDialogOpen, setIsTranscriptionDialogOpen] = useState(false)
  const [isFilesDialogOpen, setIsFilesDialogOpen] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [rtm, setRtm] = useState<any>(null)
  const [channelName, setChannelName] = useState<string>("")

  useEffect(() => {
    const setupRTM = async () => {
      try {
        setChannelName(channel)

        const { rtm, channelName } = await initializeAgoraRTM(user, `${channel}file`)

        setRtm(rtm)
     
      } catch (error) {
        console.error("Failed to initialize Agora RTM:", error)
      } 
    }

    setupRTM()

  }, [])
    // Track mouse position for hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Create particle effect when clicking icons
  const createParticles = (x: number, y: number) => {
    const newParticles = []
    const colors = isDark
      ? [
          "rgba(129, 140, 248, 0.8)", // indigo
          "rgba(167, 139, 250, 0.8)", // purple
          "rgba(236, 72, 153, 0.8)", // pink
          "rgba(251, 146, 60, 0.8)", // orange
          "rgba(52, 211, 153, 0.8)", // emerald
        ]
      : [
          "rgba(99, 102, 241, 0.8)", // indigo
          "rgba(147, 51, 234, 0.8)", // purple
          "rgba(219, 39, 119, 0.8)", // pink
          "rgba(245, 158, 11, 0.8)", // amber
          "rgba(16, 185, 129, 0.8)", // emerald
        ]

    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: particleCount + i,
        x,
        y,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 1 + 0.5,
      })
    }

    setParticleCount(particleCount + 12)
    setParticles([...particles, ...newParticles])

    // Remove particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)))
    }, 1500)
  }

  const handleIconClick = (iconName: string, event: React.MouseEvent) => {
    setActiveIcon(iconName)
    createParticles(event.clientX, event.clientY)

    if (iconName === "chat") {
      setIsChatOpen(!isChatOpen)
    }
  }

  const handleTranscriptionRequest = (enabled: boolean) => {
    setIsTranscriptionDialogOpen(false)
    if (onRequestTranscription) {
      onRequestTranscription(enabled)
    }
  }

  const getIconStyles = (iconName: string) => {
    const isActive = activeIcon === iconName || (iconName === "chat" && isChatOpen)
    const isHovered = hoveredIcon === iconName

    return {
      container: cn(
        "relative group flex items-center justify-center transition-all duration-300",
        "w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl xs:rounded-2xl",
        isActive
          ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/20"
          : isHovered
            ? "bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-500/30 dark:via-purple-500/30 dark:to-pink-500/30"
            : "bg-transparent hover:bg-white/5 dark:hover:bg-white/10",
      ),
      icon: cn(
        "transition-all duration-300",
        "w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5",
        isActive
          ? "text-white"
          : isDark
            ? "text-gray-400 group-hover:text-white"
            : "text-gray-600 group-hover:text-indigo-600",
      ),
    }
  }

  return (
    <div className="z-50 relative w-16 xs:w-18 sm:w-20 md:w-22 h-full bg-gradient-to-b from-gray-100/95 via-gray-100/98 to-white/95 dark:from-gray-900/95 dark:via-gray-900/98 dark:to-black/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-white/5 flex flex-col items-center py-4 xs:py-5 sm:py-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20">
          <div className="absolute top-1/4 left-1/3 w-24 xs:w-28 sm:w-32 h-24 xs:h-28 sm:h-32 bg-indigo-500 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-2/3 left-1/4 w-24 xs:w-28 sm:w-32 h-24 xs:h-28 sm:h-32 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 xs:w-28 sm:w-32 h-24 xs:h-28 sm:h-32 bg-pink-500 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bTQ0LTEzaDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-20"></div>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none rounded-full z-10"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: particle.x + (Math.random() * 100 - 50),
            y: particle.y + (Math.random() * 100 - 50),
            opacity: [1, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Logo */}
      <motion.div
        className="mb-6 xs:mb-8 sm:mb-10 relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => handleIconClick("logo", e)}
        onMouseEnter={() => setHoveredIcon("logo")}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <div className="relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl"
            animate={{
              rotate: [0, 360],
              borderRadius: ["20%", "50%", "20%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute inset-1 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center"
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <Atom className="h-5 w-5 xs:h-5.5 xs:w-5.5 sm:h-6 sm:w-6 text-indigo-600 dark:text-white" />
          </motion.div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-30 blur-md"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </motion.div>

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-4 xs:space-y-5 sm:space-y-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className={getIconStyles("schedule").container}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleIconClick("schedule", e)}
                onMouseEnter={() => setHoveredIcon("schedule")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Clock className={getIconStyles("schedule").icon} />

                {/* Animated ring for active state */}
                {activeIcon === "schedule" && (
                  <motion.div
                    className="absolute -inset-1 rounded-xl xs:rounded-2xl border border-white/30 dark:border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [0, 90],
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white"
            >
              Schedule
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className={getIconStyles("chat").container}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleIconClick("chat", e)}
                onMouseEnter={() => setHoveredIcon("chat")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <MessageSquare className={getIconStyles("chat").icon} />

                {/* Notification indicator */}
                {isChatOpen && (
                  <motion.div
                    className="absolute -inset-1 rounded-xl xs:rounded-2xl border border-white/30 dark:border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [0, 90],
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white"
            >
              Chat
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className={getIconStyles("files").container}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {handleIconClick("files", e), setIsFilesDialogOpen((prev)=>!prev)}}
                onMouseEnter={() => setHoveredIcon("files")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Folder className={getIconStyles("files").icon} />

                {activeIcon === "files" && (
                  <motion.div
                    className="absolute -inset-1 rounded-xl xs:rounded-2xl border border-white/30 dark:border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [0, 90],
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white"
            >
              Files
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className={getIconStyles("analytics").container}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleIconClick("analytics", e)}
                onMouseEnter={() => setHoveredIcon("analytics")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <BarChart2 className={getIconStyles("analytics").icon} />

                {activeIcon === "analytics" && (
                  <motion.div
                    className="absolute -inset-1 rounded-xl xs:rounded-2xl border border-white/30 dark:border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [0, 90],
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white"
            >
              Analytics
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

       {classes && <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className={getIconStyles("users").container}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {handleIconClick("users", e); setIsSlidesOpen((prev=>!prev))}}
                onMouseEnter={() => setHoveredIcon("users")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Presentation className={getIconStyles("users").icon} />

                {activeIcon === "users" && (
                  <motion.div
                    className="absolute -inset-1 rounded-xl xs:rounded-2xl border border-white/30 dark:border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [0, 90],
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white"
            >
              PSlides
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>}

        {transcription && 
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className={getIconStyles("transcription").container}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) =>{ handleIconClick("transcription", e); setIsTranscriptionDialogOpen((prev)=>!prev)}}
                onMouseEnter={() => setHoveredIcon("transcription")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <FileAudio className={getIconStyles("transcription").icon} />

                {activeIcon === "transcription" && (
                  <motion.div
                    className="absolute -inset-1 rounded-xl xs:rounded-2xl border border-white/30 dark:border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [0, 90],
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white"
            >
              Live Transcription
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        }
      </div>

      {/* Bottom section */}
      <div className="mt-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className={getIconStyles("settings").container}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleIconClick("settings", e)}
                onMouseEnter={() => setHoveredIcon("settings")}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Settings className={getIconStyles("settings").icon} />

                {activeIcon === "settings" && (
                  <motion.div
                    className="absolute -inset-1 rounded-xl xs:rounded-2xl border border-white/30 dark:border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: [0, 90],
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white"
            >
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TranscriptionDialog
        isOpen={isTranscriptionDialogOpen}
        onClose={() => setIsTranscriptionDialogOpen(false)}
        onRequestTranscription={handleTranscriptionRequest}
      />

      <FilesDialog
        isOpen={isFilesDialogOpen}
        user={user}
        rtm={rtm}
        channelName={channelName}
        onClose={() => setIsFilesDialogOpen(false)}
        userId={user?.userId}
        userName={user?.name}
        />

      {/* Decorative elements */}
      <div className="absolute bottom-3 xs:bottom-3.5 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-8 xs:w-9 sm:w-10 h-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-full"></div>
    </div>
  )
}

