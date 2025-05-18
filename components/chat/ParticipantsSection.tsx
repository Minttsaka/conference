"use client"

import { useCallback } from "react"
import { Users, ChevronUp, ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hook/useMediaQuery"
import { useOverflow } from "@/hook/useOverflow"
import { VideoStream } from "./VideoStream"
import { ReactionMessage } from "@/lib/initAgoraClient"
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng"


interface ParticipantsSectionProps {
  remoteUsers: IAgoraRTCRemoteUser[]
  maximizedParticipant: string | null
  raisedHands: Set<string>
  reactions: Set<ReactionMessage>
  sendReaction:(reactionMessage:ReactionMessage) => Promise<void>
  userId: string
  handleToggleMaximize: (userId: string) => void
  handleMuteRemoteUser: (userId: string) => void
  className?: string
  audioTrack?: any
  isScreen?:boolean,
  onMuteRemoteUser?: () => void
  isHandRaised?: boolean
}

export function ParticipantsSection({
  remoteUsers,
  maximizedParticipant,
  raisedHands,
  reactions,
  sendReaction,
  userId,
  handleToggleMaximize,
  handleMuteRemoteUser,
}: ParticipantsSectionProps) {
  const isXlScreen = useMediaQuery("(min-width: 1280px)")
  

  // Use our custom overflow hook
  const { ref, isOverflowingVertically, checkOverflow } = useOverflow<HTMLDivElement>({
    horizontal: false,
    vertical: true,
  })

  const filteredUsers = remoteUsers.filter((user) => !user.uid.toString().includes("*&$screen"))
  const hasParticipants = filteredUsers.length > 0

  // Scroll handlers
  const scrollUp = useCallback(() => {
    if (ref.current) {
      ref.current.scrollBy({ top: -200, behavior: "smooth" })
    }
  }, [ref])

  const scrollDown = useCallback(() => {
    if (ref.current) {
      ref.current.scrollBy({ top: 200, behavior: "smooth" })
    }
  }, [ref])

  // Don't render on mobile if no participants
  if (!hasParticipants && !isXlScreen) {
    return null
  }

  return (
    <div className="relative h-full w-full  overflow-hidden">
      {/* Header with title */}
      <div className="flex items-center w-fit mb-1 space-x-1.5 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-indigo-300">Participants</span>
      </div>
      

      {/* Scrollable container */}
      <div
        ref={ref}
        className="h-[calc(100%-2rem)] w-full 
          xl:overflow-y-auto xl:overflow-x-hidden 
          overflow-x-auto overflow-y-hidden
          scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 
          scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600
          scrollbar-thumb-rounded-full"
        style={{
          scrollbarWidth: "thin",
          msOverflowStyle: "none",
        }}
      >
        {/* Content container */}
        <div className="flex xl:flex-col xl:space-y-1 xl:space-x-0 space-x-1 space-y-0 h-full xl:h-auto xl:w-full">
          {hasParticipants ? (
            // Map through remote users if there are any
            filteredUsers.map((remoteUser) => {
              const userName = remoteUser.uid.toString().split("-")[1] // Extract user name
              return (
                <div key={remoteUser.uid.toString()} className="flex-shrink-0 w-80 xl:w-full h-full xl:h-64 relative">
                  <VideoStream
                    videoTrack={remoteUser.videoTrack}
                    audioTrack={remoteUser.audioTrack}
                    userId={remoteUser.uid.toString()}
                    appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
                    maximisedUser={maximizedParticipant}
                    isLocal={false}
                    reactions={reactions}
                    sendReaction={sendReaction}
                    isVideoOff={false}
                    isHandRaised={raisedHands.has(remoteUser.uid.toString())}
                    userName={userName}
                    userAvatar={remoteUser.uid.toString()}
                    isMuted={!!remoteUser.audioTrack}
                    isSpeaking={false}
                    isMaximized={false}
                    onToggleMaximize={() => handleToggleMaximize(remoteUser.uid.toString())}
                    onMuteRemoteUser={() => handleMuteRemoteUser(remoteUser.uid.toString())}
                    className="h-full w-full"
                  />
                </div>
              )
            })
          ) : (
            // Show informative message on large screens only
            <div className="hidden xl:flex w-full h-64 items-center justify-center bg-gray-100/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center p-6">
                <Users className="h-10 w-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-600 dark:text-gray-400">Participants will appear here when they join</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overflow controls for large screens only - visible when overflowing */}
      {isXlScreen && isOverflowingVertically && (
        <div className="absolute bottom-4 right-4 transition-opacity duration-300">
          <div className="flex flex-col items-center space-y-2">
            <button
              className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors"
              onClick={scrollUp}
              aria-label="Scroll up"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <button
              className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors"
              onClick={scrollDown}
              aria-label="Scroll down"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

