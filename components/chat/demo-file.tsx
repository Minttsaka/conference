"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import {
  ChevronLeft,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  PhoneOff,
  Users,
  Hand,
  Share2,
  UserPlus,
  MoreVertical,
  Settings,
  FileText,
  ChevronRight,
  X,
  Check,
  Copy,
  Mic,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAgora } from "@/hook/useAgora"
import { getOrCreateUserId } from "@/lib/userGn"
import type { VideoRoomProps } from "@/types/video"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { VideoStream } from "./VideoStream"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DimensionalSidebar } from "./DimensionalSidebar"
import { useTheme } from "next-themes"
import { ParticipantsList } from "./ParticipantsList"
import AgoraRTC from "agora-rtc-sdk-ng"
import { HandRaiseRequests } from "./HandRaiseRequests"
import { useAgoraRTM } from "@/hook/useAgoraRTM"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ParticipantsSection } from "./ParticipantsSection"
import { SharedScreensSection } from "./SharedScreensSection"
import { ConnectionStatusIndicator, ConnectionStatusIndicatorMobile } from "@/hook/useAgoraConnectionStatus"
import { Meeting } from "@/types/clasroom"
import SlidePresentation from "../slides/SlidePresentation"
import { AgendaButton } from "../agenda/AgendaTriggerButton"
import { SessionPayload } from "@/lib/session"
import MessageList from "../futuristicChat/MessageList"
import MessageInput from "../futuristicChat/MessageInput"
import { ScrollArea } from "../ui/scroll-area"


export function VideoRoom({ 
  meetingId 
  , user 
}: 
  VideoRoomProps) {
  const [copied, setCopied] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [meeting, setMeeting] = useState<Meeting>()
  const [maximizedParticipant, setMaximizedParticipant] = useState<string | null>(null)
  const [screenTrack, setScreenTrack] = useState<any>(null)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showHandRaiseRequests, setShowHandRaiseRequests] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isSlidesOpen, setIsSlidesOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
const screenClientRef = useRef<any>(null)

const { theme, setTheme } = useTheme()

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const userId = getOrCreateUserId(user as SessionPayload)

  // if(!token){
  //   return window.location.href = `/join/${meeting?.id}`
  // }

  // useEffect(()=>{
  //   (async () => {
  //     setIsLoading(true)
  //     setMeeting((await getMeeting(meetingId)).meeting)
  //   })();
  // },[])

  const {
    client,
    localVideoTrack,
    localAudioTrack,
    remoteUsers,
    speakingUsers,
    joinChannel,
    leaveChannel,
    toggleAudio,
    settings,
    toggleVideo,
    setupEventListeners,
    shareLink,
  } = useAgora({
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    channel: meetingId,
    token: "token",
    user : user,
    uid: userId,
    isHost:meeting?.host.id === user?.userId
  })

  const { 
    raisedHands,
    toggleHand,
     pendingRequests ,
     messages,
     messagesEndRef,
     sendReaction,
     setReplyingTo,
     replyingTo,
     typingTimeoutRef,
     addReaction,
     sendMessage,
     handleTyping
    } = useAgoraRTM({
        user : user,
        channel : meetingId,
      })

  useEffect(() => {
    
    if(pendingRequests){
      if (pendingRequests.size > 0) {
        setShowHandRaiseRequests(true)
      }
    }
  }, [pendingRequests])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(meetingId)
      setCopied(true)
      toast.success("Meeting ID copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy Meeting ID")
    }
  }

  const handleShareLink = () => {
    if (shareLink) {
      shareLink(meetingId)
      toast.success("Invitation link copied to clipboard")
    }
  }

  useEffect(() => {
    
    if (token && client) {
      setupEventListeners(client)
      joinChannel()
    }

  }, [token, client, joinChannel, leaveChannel, setupEventListeners])



  const isMuted = localAudioTrack ? !localAudioTrack.enabled : true
  const isVideoOff = localVideoTrack ? !localVideoTrack.enabled : true

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        toast.error("Error attempting to enable fullscreen mode")
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const handleToggleMaximize = (participantId: string) => {
    if (maximizedParticipant === participantId) {
      setMaximizedParticipant(null)
    } else {
      setMaximizedParticipant(participantId)
    }
  }

  const handleMuteRemoteUser = (participantId: string) => {
    // This would typically integrate with your Agora SDK
    console.log(`Muting remote user: ${participantId}`)
    // Implementation depends on your Agora setup
  }

  
  const generateToken = async () => {

    try {
      const userId = getOrCreateUserId(user as SessionPayload)
      const id = `${userId}*&$screen`
      const response = await fetch('/api/video-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelName : meetingId, uid: id, userRole: 'student' }),
      });

      const data = await response.json();

      if (response.ok) {
     
        return {
          token : data.token,
          id
        }

      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const data = await generateToken()

        screenClientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
        await screenClientRef.current.join(process.env.NEXT_PUBLIC_AGORA_APP_ID, meetingId,data?.token, data?.id)
        
        const screenVideoTrack = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: '1080p_1',
        }, 'auto')

        if (!screenVideoTrack) {
          throw new Error('Screen sharing was canceled')
        }

        if (Array.isArray(screenVideoTrack)) {
          screenVideoTrack[0].on('track-ended', () => {
            handleScreenShareEnded()
          })
        } else {
          screenVideoTrack.on('track-ended', () => {
            handleScreenShareEnded()
          })
        }
        
        setScreenTrack(screenVideoTrack)
        await screenClientRef.current.publish(screenVideoTrack)
        setIsScreenSharing(true)
        toast.success('Screen sharing started')
      } else {
        if (screenTrack) {
          await client?.unpublish(screenClientRef.current)
          setScreenTrack(null)
        }
        await screenClientRef.current?.leave()
        setIsScreenSharing(false)
        toast.success('Screen sharing stopped')
        if (localVideoTrack) {
          await client?.publish(localVideoTrack)
        }
      }
    } catch (error) {
      console.error('Screen sharing error:', error)
      toast.error('Failed to toggle screen sharing')
    }
  }

  const handleScreenShareEnded = async () => {
    if (isScreenSharing) {
      try {
        if (screenTrack) {
          // Check if it's an array (sometimes Agora returns an array of tracks)
          if (Array.isArray(screenTrack)) {
            screenTrack.forEach(track => track.close())
          } else {
            screenTrack.close()
          }
          await screenClientRef.current?.unpublish(screenTrack)
          setScreenTrack(null)
        }
        await screenClientRef.current?.leave()
        setIsScreenSharing(false)
        toast.success('Screen sharing stopped')
        if (localVideoTrack) {
          await client?.publish(localVideoTrack)
        }
      } catch (error) {
        console.error('Error handling screen share end:', error)
        toast.error('Error stopping screen share')
      }
    }
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">

      {/* Left Sidebar */}
      {isOpen && 
      <DimensionalSidebar
        isAgenda={meeting?.agenda as boolean}
        channel={meetingId}
        user={user as SessionPayload} isChatOpen={isChatOpen} 
        setIsSlidesOpen={setIsSlidesOpen}
        setIsChatOpen={setIsChatOpen}
        meetingType={meeting?.type as "LESSON" | "MEETING"}
        transcription={meeting?.transcription as boolean} 
      />}

    {isSlidesOpen && <SlidePresentation lesson={meeting?.lesson} setIsSlidesOpen={setIsSlidesOpen}  />}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="relative h-auto sm:h-20 py-3 sm:py-0 z-10 overflow-hidden">
          {/* Animated background elements - unchanged */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-800/20 to-pink-800/20 dark:from-indigo-900/30 dark:via-purple-800/30 dark:to-pink-800/30"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptNC0xM2g0djFoLTR2LTF6bTAtMmgxdjRoLTF2LTR6bTItMmgxdjFoLTF2LTF6bS0yIDJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-20"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"></div>

          {/* Main content with dimensional effect */}
          <div className="relative h-full flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center space-x-4">
              {/* Back button with hover effect */}
              <motion.div className="xl:hidden" whileHover={{ scale: 1.05, rotate: -5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={()=>setIsOpen(prev=>!prev)}
                  className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 dark:border-gray-700/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-md opacity-0 hover:opacity-100 transition-opacity"></div>
                  {isOpen ? <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" /> :<ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
                </Button>
              </motion.div>

              {/* Title with dimensional effect */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <h1 className="text-xl hidden xl:block font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                    {meeting?.topic}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="relative px-2.5 py-1 rounded-full overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 opacity-90"></span>
                      <span className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bS0yIDJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></span>
                      <span className="relative text-xs font-medium text-white">Team</span>
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                      <span className="hidden sm:inline">Participants:</span> {remoteUsers.length + 1}
                    </span>
                  </div>
                </motion.div>

                {/* Subtle shadow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-lg blur-lg -z-10"></div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Meeting ID - always visible */}
              <motion.div
                className="relative hidden xl:block group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-30 blur-sm group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between gap-3 bg-white dark:bg-gray-800 p-2.5 rounded-lg border border-white/50 dark:border-gray-700/50 shadow-xl">
                  <div>
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Meeting ID</p>
                    <div className="flex items-center">
                      <p className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate max-w-[80px] sm:max-w-[120px] xl:max-w-none">{meetingId}</p>
                      <span className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                  </div>
                  <motion.button
                    onClick={copyToClipboard}
                    className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white p-2 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="absolute inset-0 bg-white opacity-10 animate-pulse"></span>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Connection status - visible on md+ screens */}
              <ConnectionStatusIndicator client={client} className="ml-2" />

              {/* Summary button - visible on xl+ screens */}
              {meeting?.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="hidden xl:block"
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-md opacity-0 hover:opacity-100 transition-opacity"></div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-500">
                          Summary
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/50 dark:border-gray-700/50 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-md"></div>
                      <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Meeting Description</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 relative z-10">{meeting?.description}</p>
                    </PopoverContent>
                  </Popover>
                </motion.div>
              )}

              {/* Share button - visible on lg+ screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden lg:block"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleShareLink}
                        className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-md opacity-0 hover:opacity-100 transition-opacity"></div>
                        <Share2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/50 dark:border-gray-700/50">
                      Share meeting link
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>

              {/* Theme toggle - always visible */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="relative w-12 h-6 rounded-full cursor-pointer overflow-hidden"
                aria-label="Toggle dark mode"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-indigo-600 dark:to-purple-700 transition-colors duration-500"></div>
                <div className="absolute inset-0.5 bg-white/90 dark:bg-gray-900/90 rounded-full transition-all duration-500"></div>
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-500 ${theme === "dark" ? "left-7 bg-indigo-300" : "left-1 bg-amber-400"}`}
                >
                  <span
                    className={`absolute inset-0 rounded-full ${theme === "dark" ? "bg-indigo-400" : "bg-amber-500"} animate-pulse opacity-70`}
                  ></span>
                </div>
                <div
                  className={`absolute top-1 transition-all duration-500 ${theme === "dark" ? "opacity-100 left-7" : "opacity-0 left-1"}`}
                >
                  <div className="w-1 h-1 bg-white rounded-full absolute top-0 left-0.5 opacity-70"></div>
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-1 left-2 opacity-50"></div>
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute bottom-0.5 left-1 opacity-60"></div>
                </div>
                <div
                  className={`absolute top-1 transition-all duration-500 ${theme === "dark" ? "opacity-0 left-1" : "opacity-100 left-1"}`}
                >
                  <div className="w-0.5 h-0.5 bg-amber-800 rounded-full absolute top-0.5 right-0.5 opacity-70"></div>
                  <div className="w-0.5 h-0.5 bg-amber-800 rounded-full absolute bottom-0 right-1 opacity-70"></div>
                </div>
              </motion.div>

              {/* More options menu - visible on smaller screens */}
              <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 lg:hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-md opacity-0 hover:opacity-100 transition-opacity"></div>
              <MoreVertical className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/50 dark:border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-md -z-10"></div>
            
            {/* Title in dropdown - only show on smaller screens */}
            <DropdownMenuItem className="xl:hidden focus:bg-gray-100/50 dark:focus:bg-gray-700/50">
              <div className="flex flex-col w-full">
                <span className="text-xs text-gray-500 dark:text-gray-400">Meeting Title</span>
                <span className="font-medium text-gray-900 dark:text-white">{meeting?.topic}</span>
              </div>
            </DropdownMenuItem>
            
            {/* Meeting ID in dropdown - only show on smaller screens */}
            <DropdownMenuItem className="xl:hidden focus:bg-gray-100/50 dark:focus:bg-gray-700/50" onSelect={(e) => e.preventDefault()}>
              <div className="flex flex-col w-full">
                <span className="text-xs text-gray-500 dark:text-gray-400">Meeting ID</span>
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-sm text-gray-900 dark:text-white truncate max-w-[150px]">{meetingId}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="h-6 px-2 ml-2"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </Button>
                </div>
              </div>
            </DropdownMenuItem>
            
            {/* Connection status in dropdown - only show on smaller screens */}
            <DropdownMenuItem className="md:hidden focus:bg-gray-100/50 dark:focus:bg-gray-700/50">
                <ConnectionStatusIndicatorMobile client={client} />
              </DropdownMenuItem>

            {/* Share in dropdown - only show on smaller screens */}
            <DropdownMenuItem className="lg:hidden focus:bg-gray-100/50 dark:focus:bg-gray-700/50" onClick={handleShareLink}>
              <Share2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span>Share meeting link</span>
            </DropdownMenuItem>
            
            {/* Summary in dropdown - only show on smaller screens */}
            {meeting?.description && (
              <DropdownMenuItem className="xl:hidden focus:bg-gray-100/50 dark:focus:bg-gray-700/50" onSelect={(e) => e.preventDefault()}>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center w-full">
                      <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                      <span>View summary</span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/50 dark:border-gray-700/50 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-md"></div>
                    <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Meeting Description</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 relative z-10">{meeting?.description}</p>
                  </PopoverContent>
                </Popover>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            
            {/* Additional options */}
            <DropdownMenuItem className="focus:bg-gray-100/50 dark:focus:bg-gray-700/50">
              <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-2" />
              <span>Meeting settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="focus:bg-gray-100/50 dark:focus:bg-gray-700/50">
              <Users className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-2" />
              <span>View participants</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
            </div>
          </div>

          {/* Bottom border with gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className={`flex-1 flex flex-col`}>
            <div className="flex-1 p-4 h-full overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full">
                  {/* Local video takes full height when no remote users */}
                  <div className="h-full">
                    <VideoStream
                      userId={''}
                      transcription={meeting?.transcription as boolean}
                      maximisedUser = {maximizedParticipant}
                      videoTrack={localVideoTrack}
                      audioTrack={localAudioTrack}
                      isMaximized={true}
                      userAvatar=""
                      settings = {settings}
                      onMuteRemoteUser={()=>{}}
                      onToggleMaximize={()=>{}}
                      userName="You"
                      appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
                      isLocal={true}
                      isSpeaking={false}
                      isMuted={isMuted}
                      isVideoOff={isVideoOff}
                      className="h-full"
                    />
                  </div>
                  <div className="grid gap-4 xl:grid-cols-2 h-full">
                    <ParticipantsSection
                      remoteUsers={remoteUsers}
                      maximizedParticipant={maximizedParticipant}
                      raisedHands={raisedHands}
                      userId={userId}
                      handleToggleMaximize={handleToggleMaximize}
                      handleMuteRemoteUser={handleMuteRemoteUser}
                    />
                    
                    <SharedScreensSection
                      remoteUsers={remoteUsers}
                      maximizedParticipant={maximizedParticipant}
                      raisedHands={raisedHands}
                      userId={userId}
                      handleToggleMaximize={handleToggleMaximize}
                      handleMuteRemoteUser={handleMuteRemoteUser}
                    />
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="relative h-auto sm:h-24 w-full">
              {/* Adaptive background with glass effect */}
              <div className="absolute inset-0 backdrop-blur-md border-t border-white/10 dark:border-white/5">
                {/* Light theme background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/90 via-indigo-50/90 to-gray-50/90 dark:opacity-0 opacity-100 transition-opacity duration-300"></div>

                {/* Dark theme background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-indigo-950/90 to-gray-900/90 opacity-0 dark:opacity-100 transition-opacity duration-300"></div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1vcGFjaXR5PSIwLjA1Ij48cGF0aCBkPSJNMzYgMzRoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bS0yIDJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 dark:opacity-10"></div>
              </div>

              {/* Animated glow effects */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Light theme glow */}
                <div className="absolute top-0 left-1/4 w-1/2 h-24 bg-indigo-400/20 dark:bg-transparent rounded-full filter blur-3xl opacity-0 dark:opacity-0 light:opacity-30 animate-pulse"></div>

                {/* Dark theme glow */}
                <div className="absolute top-0 left-1/4 w-1/2 h-24 bg-indigo-600/30 rounded-full filter blur-3xl opacity-0 dark:opacity-30 animate-pulse"></div>
              </div>

              {/* Main controls container */}
              <div className="relative h-full px-2 sm:px-4 md:px-8 py-4 flex flex-wrap sm:flex-nowrap items-center justify-between z-10 gap-2 sm:gap-0">
                {/* Left side controls with primary actions */}
                <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-4 order-1 sm:order-1">
                  {/* Mic control with dimensional effect */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                          <div
                            className={cn(
                              "absolute -inset-0.5 xs:-inset-1 rounded-full blur-sm transition-all duration-300",
                              isMuted
                                ? "bg-gradient-to-r from-red-500/60 to-red-600/60 dark:from-red-500/40 dark:to-red-600/40"
                                : "bg-gradient-to-r from-emerald-500/60 to-emerald-600/60 dark:from-emerald-500/40 dark:to-emerald-600/40",
                            )}
                          ></div>
                          <button
                            onClick={toggleAudio}
                            className={cn(
                              "relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg",
                              "w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14", // Responsive sizing
                              isMuted
                                ? "bg-gradient-to-br from-red-500 to-red-600 text-white dark:from-red-600 dark:to-red-700"
                                : "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white dark:from-emerald-600 dark:to-emerald-700",
                            )}
                          >
                            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                            {isMuted ? (
                              <MicOff className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                            ) : (
                              <>
                                <Mic className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                                <span className="absolute inset-0 rounded-full animate-pulse bg-white/10"></span>
                              </>
                            )}
                          </button>
                          {!isMuted && (
                            <span className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                          )}
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {isMuted ? "Unmute" : "Mute"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Video control with dimensional effect */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                          <div
                            className={cn(
                              "absolute -inset-0.5 xs:-inset-1 rounded-full blur-sm transition-all duration-300",
                              isVideoOff
                                ? "bg-gradient-to-r from-red-500/60 to-red-600/60 dark:from-red-500/40 dark:to-red-600/40"
                                : "bg-gradient-to-r from-blue-500/60 to-blue-600/60 dark:from-blue-500/40 dark:to-blue-600/40",
                            )}
                          ></div>
                          <button
                            onClick={toggleVideo}
                            className={cn(
                              "relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg",
                              "w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14", // Responsive sizing
                              isVideoOff
                                ? "bg-gradient-to-br from-red-500 to-red-600 text-white dark:from-red-600 dark:to-red-700"
                                : "bg-gradient-to-br from-blue-500 to-blue-600 text-white dark:from-blue-600 dark:to-blue-700",
                            )}
                          >
                            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                            {isVideoOff ? 
                              <VideoOff className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" /> : 
                              <Video className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                            }
                          </button>
                          {!isVideoOff && (
                            <span className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                          )}
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {isVideoOff ? "Turn on camera" : "Turn off camera"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Screen share control - hidden on xs, visible on sm+ */}
              
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                            <div
                              className={cn(
                                "absolute -inset-0.5 xs:-inset-1 rounded-full blur-sm transition-all duration-300",
                                isScreenSharing
                                  ? "bg-gradient-to-r from-amber-500/60 to-amber-600/60 dark:from-amber-500/40 dark:to-amber-600/40"
                                  : "bg-gradient-to-r from-violet-500/60 to-violet-600/60 dark:from-violet-500/40 dark:to-violet-600/40",
                              )}
                            ></div>
                            <button
                              onClick={toggleScreenShare}
                              className={cn(
                                "relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg",
                                "w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14", // Responsive sizing
                                isScreenSharing
                                  ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white dark:from-amber-600 dark:to-amber-700"
                                  : "bg-gradient-to-br from-violet-500 to-violet-600 text-white dark:from-violet-600 dark:to-violet-700",
                              )}
                            >
                              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                              <ScreenShare className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                            </button>
                            {isScreenSharing && (
                              <span className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-amber-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></span>
                            )}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50"
                        >
                          {isScreenSharing ? "Stop sharing" : "Share screen"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  {/* Raise hand control - hidden on xs, visible on sm+ */}

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                            <div
                              className={cn(
                                "absolute -inset-1 rounded-full blur-sm transition-all duration-300",
                                raisedHands.has(userId)
                                  ? "bg-gradient-to-r from-yellow-500/60 to-yellow-600/60 dark:from-yellow-500/40 dark:to-yellow-600/40"
                                  : "bg-gradient-to-r from-indigo-500/60 to-indigo-600/60 dark:from-indigo-500/40 dark:to-indigo-600/40",
                              )}
                            ></div>
                            <button
                              onClick={() => toggleHand(userId)}
                              className={cn(
                                "relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg",
                                "w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14",
                                raisedHands.has(userId)
                                  ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white dark:from-yellow-600 dark:to-yellow-700"
                                  : "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white dark:from-indigo-600 dark:to-indigo-700",
                              )}
                            >
                              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                              <Hand className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                            </button>
                            {raisedHands.has(userId) && (
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></span>
                            )}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50"
                        >
                          {raisedHands.has(userId) ? "Lower hand" : "Raise hand"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 dark:from-indigo-500/40 dark:to-purple-500/40 blur-sm"></div>
                            <button
                              onClick={handleShareLink}
                              className={cn(
                                "relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg",
                                "w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white dark:from-indigo-600 dark:to-indigo-700",
                              )}
                            >
                              <UserPlus className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                            </button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50"
                        >
                          Invite participants
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                
                </div>

                {/* Center pill with participant count - theme aware */}
                <div className="hidden xl:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 dark:from-indigo-500/40 dark:via-purple-500/40 dark:to-pink-500/40 blur-sm"></div>
                    <div className="flex items-center px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg relative">
                      <div className="flex -space-x-2 mr-2">
                        {[...Array(Math.min(3, remoteUsers.length + 1))].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800"
                          >
                            {i === 0 ? "Y" : remoteUsers[i - 1]?.uid.toString().charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-gray-800 dark:text-white font-medium">{remoteUsers.length + 1}</span>
                    </div>
                  </div>
                </div>


                {/* Right side controls */}
                <div className="flex items-center space-x-2 sm:space-x-4 order-2 sm:order-3">
                  {/* Invite button - theme aware, hidden on xs, visible on sm+ */}
                  <div className="hidden xs:block">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 dark:from-indigo-500/40 dark:to-purple-500/40 blur-sm"></div>
                            <button
                              onClick={handleShareLink}
                              className="relative flex items-center justify-center px-3 sm:px-5 py-2 sm:py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300"
                            >
                              <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-indigo-600 dark:text-indigo-400" />
                              <span className="text-sm sm:text-base">Invite</span>
                            </button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50"
                        >
                          Invite participants
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                 {meeting?.agendaItems && meeting.agendaItems.length > 0 && (
                    <AgendaButton meeting={meeting as Meeting} />
                  )}


                  {/* Leave meeting button with dimensional effect */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                          <div className="absolute -inset-0.5 xs:-inset-1 rounded-full blur-sm transition-all duration-300 bg-gradient-to-r from-red-500/60 to-pink-600/60 dark:from-red-500/40 dark:to-pink-600/40"></div>
                          <button
                            onClick={leaveChannel}
                            className="relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-red-500/30 dark:shadow-red-500/20"
                          >
                            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                            <PhoneOff className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                            <span className="absolute inset-0 rounded-full animate-ping bg-red-400/20"></span>
                          </button>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50"
                      >
                        Leave meeting
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Chat */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                className="absolute inset-x-0 md:static md:w-96 border-l dark:border-gray-800 flex flex-col h-full bg-white dark:bg-gray-900"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Tabs defaultValue="chat" className="flex flex-col h-full">
                  <div className="flex items-center gap-2 border-b dark:border-gray-800 px-4 py-2">
                    <TabsList className="w-full">
                      <TabsTrigger value="chat" className="flex-1">
                        Chat
                      </TabsTrigger>
                      <TabsTrigger value="participants" className="flex-1">
                        Participants
                      </TabsTrigger>
                    </TabsList>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-white/5"
                      onClick={()=>setIsChatOpen(prev=>!prev)}
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    </Button>
                  </div>

                  <TabsContent value="chat" className="flex-1 h-[calc(100vh-350px)] bg-gray-950  overflow-hidden flex flex-col">
                    <ScrollArea className="flex-1 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent p-4">
                      <MessageList
                        messages={messages}
                        setReplyingTo={setReplyingTo}
                        addReaction={addReaction}
                        currentUserId={user.userId}
                      />
                      <div ref={messagesEndRef} />
                    </ScrollArea>
              
                    <div className="relative">
                      <MessageInput
                        onSendMessage={sendMessage}
                        onTyping={handleTyping}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="participants" className="h-full overflow-y-auto">
                    <ParticipantsList
                        remoteUsers={remoteUsers}
                        hostId={meeting?.hostId as string}
                        localUser={{
                          id: userId,
                          name:user?.name as string,
                          isMuted: isMuted,
                          isVideoOff: isVideoOff,
                          isHandRaised: raisedHands.has(userId),
                          isSpeaking: speakingUsers.has(userId),
                        }}
                        speakingUsers={speakingUsers}
                        raisedHands={raisedHands}
                        onMuteUser={(participantId) => handleMuteRemoteUser(participantId)}
                        onPinUser={(participantId) => toggleFullscreen()}
                        onSendMessage={(participantId) => {
                          setIsChatOpen(true)
                          // In a real implementation, you would focus the chat and set the recipient
                        }}
                      />
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {showHandRaiseRequests && (
        <HandRaiseRequests
          pendingRequests={pendingRequests}
          onAccept={()=>{}}
          onDecline={()=>setShowHandRaiseRequests(false)}
        />
      )}
      
    </div>
  )
}

