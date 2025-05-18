"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { VideoStream } from "./VideoStream"
import { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"

interface VideoGridProps {
    localVideoTrack: ICameraVideoTrack | null
    localAudioTrack: IMicrophoneAudioTrack | null
    participants: IAgoraRTCRemoteUser[]
    isMuted: boolean,
    userName:string,
    isVideoOff: boolean,
    className?: string
}

export function VideoGrid({ 
    localVideoTrack,
    participants, 
    className,
    isMuted,
    isVideoOff
}: VideoGridProps) {
  const [maximizedParticipant, setMaximizedParticipant] = useState<string | null>(null)
  const [layout, setLayout] = useState<"grid" | "spotlight">("grid")

  useEffect(() => {
    // If the maximized participant leaves, reset the view
    if (maximizedParticipant && !participants.find((p) => p.uid.toString() === maximizedParticipant)) {
      setMaximizedParticipant(null)
      setLayout("grid")
    }
  }, [participants, maximizedParticipant])

  const handleToggleMaximize = (participantId: string) => {
    if (maximizedParticipant === participantId) {
      setMaximizedParticipant(null)
      setLayout("grid")
    } else {
      setMaximizedParticipant(participantId)
      setLayout("spotlight")
    }
  }

  const handleMuteRemoteUser = (participantId: string) => {
    // This would typically integrate with your Agora SDK
    console.log(`Muting remote user: ${participantId}`)
    // Implementation depends on your Agora setup
  }

  if (layout === "spotlight" && maximizedParticipant) {
    const mainParticipant = participants.find((p) => p.uid.toString() === maximizedParticipant)
    const otherParticipants = participants.filter((p) => p.uid.toString() !== maximizedParticipant)

    if (!mainParticipant) return null

    return (
      <div className={cn("flex flex-col h-full", className)}>
        {/* <div className="flex-shrink-0 w-1/2 aspect-video">
          <VideoStream
            videoTrack={mainParticipant.videoTrack}
            audioTrack={mainParticipant.audioTrack}
            isMaximized={true}
            isVideoOff={false}
            userAvatar=""
            userName=""
            isLocal={true}
            isSpeaking={false}
            isMuted={true}
            onToggleMaximize={() => handleToggleMaximize(mainParticipant.uid.toString())}
            onMuteRemoteUser={() => handleMuteRemoteUser(mainParticipant.uid.toString())}
          />
        </div> */}

        {otherParticipants.length > 0 && (
          <div className="h-24 md:h-32 flex space-x-2 overflow-x-auto pb-1">
            {otherParticipants.map((participant) => (
              <div key={participant.uid.toString()} className="flex-shrink-0 w-auto aspect-video">
                <VideoStream
                    key={participant.uid.toString()}
                    videoTrack={participant.videoTrack}
                    audioTrack={participant.audioTrack}
                    isLocal={true}  
                    isVideoOff={false}
                    userName={participant.uid.toString().split('-')[4]} 
                    userAvatar={participant.uid.toString()} 
                    isMuted={!!participant.audioTrack} 
                    isSpeaking={false}
                    isMaximized={false}
                    onToggleMaximize={() => handleToggleMaximize(participant.uid.toString())}
                    onMuteRemoteUser={() => handleMuteRemoteUser(participant.uid.toString())}
                    className="h-full w-full"
                    />

              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Grid layout
  return (
    <div
      className={cn(
        "grid gap-3 h-full w-full",
        participants.length === 1 && "grid-cols-1",
        participants.length === 2 && "grid-cols-2",
        participants.length >= 3 && participants.length <= 4 && "grid-cols-2",
        participants.length > 4 && "grid-cols-3",
        className,
      )}
    >
      {participants.map((participant) => (
        <VideoStream
            key={participant.uid.toString()}
            videoTrack={participant.videoTrack}
            audioTrack={participant.audioTrack}
            isLocal={true}  
            isVideoOff={false}
            userName={participant.uid.toString().split('-')[4]} 
            userAvatar={participant.uid.toString()} 
            isMuted={!!participant.audioTrack} 
            isSpeaking={false}
            isMaximized={false}
            onToggleMaximize={() => handleToggleMaximize(participant.uid.toString())}
            onMuteRemoteUser={() => handleMuteRemoteUser(participant.uid.toString())}
            className="h-full w-full"
        />
      ))}
    </div>
  )
}

