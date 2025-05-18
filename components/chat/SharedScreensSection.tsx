"use client"
import { ScreenShare } from "lucide-react"
import { useCallback } from "react"
import { Users, ChevronUp, ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hook/useMediaQuery"
import { useOverflow } from "@/hook/useOverflow"
import { VideoStream } from "./VideoStream"
import { ReactionMessage } from "@/lib/initAgoraClient"
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng"



interface SharedScreensSectionProps {
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

export function SharedScreensSection({
  remoteUsers,
  maximizedParticipant,
  raisedHands,
  reactions,
  sendReaction,
  userId,
  handleToggleMaximize,
  handleMuteRemoteUser,
}: SharedScreensSectionProps) {
  const isXlScreen = useMediaQuery("(min-width: 1280px)")

  // Use our custom overflow hook
  const { ref, isOverflowing, checkOverflow } = useOverflow<HTMLDivElement>({
    horizontal: !isXlScreen,
    vertical: isXlScreen,
  })

  const filteredScreens = remoteUsers.filter((user) => user.uid.toString().includes("*&$screen"))
  const hasScreens = filteredScreens.length > 0

  // Don't render on mobile if no screens are being shared
  if (!hasScreens && !isXlScreen) {
    return null
  }

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Header with title */}
   

      <div className="flex w-fit items-center mb-1 space-x-1.5 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-indigo-300">Shared Screens</span>
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
        {/* Content container - flex row on mobile, flex column on xl */}
        <div className="flex flex-row xl:flex-col xl:space-y-1 space-y-0 space-x-1 xl:space-x-0 h-full xl:h-auto xl:w-full">
          {hasScreens ? (
            // Map through shared screens if there are any
            filteredScreens.map((remoteUser) => {
              const uidParts = remoteUser.uid.toString().split("*&$")
              const userName = uidParts[1]

              return (
                <div 
                  key={remoteUser.uid.toString()} 
                  className="flex-shrink-0 w-80 xl:w-full h-full xl:h-64 relative"
                >
                  <VideoStream
                    videoTrack={remoteUser.videoTrack}
                    audioTrack={remoteUser.audioTrack}
                    userId={remoteUser.uid.toString()}
                    maximisedUser={maximizedParticipant}
                    isLocal={false}
                    reactions={reactions}
                    sendReaction={sendReaction}
                    appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
                    isHandRaised={raisedHands.has(userId)}
                    isVideoOff={false}
                    userName={`${userName}-screen`}
                    isScreen={true}
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
                <ScreenShare className="h-10 w-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-600 dark:text-gray-400">Shared screens will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

