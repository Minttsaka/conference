import Image from "next/image"
import { useEffect, useRef } from 'react'
import { ICameraVideoTrack, IRemoteVideoTrack } from 'agora-rtc-sdk-ng'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface VideoStreamProps {
  user: any | null
  videoTrack?: ICameraVideoTrack | IRemoteVideoTrack | null
  isLocal?: boolean
  isTeacher?: boolean
  userName?: string
  userAvatar?: string
  isMuted?: boolean
  isHandRaised?: boolean
  isSpeaking?: boolean
  isMaximized?: boolean
  isScreenShare?: boolean
  canControlAudio?: boolean
  isRemoteAudioEnabled?: boolean
  onToggleMaximize?: () => void
  onToggleAudio?: () => void
}

export function VideoStream({
  user,
  videoTrack,
  isLocal = false,
  isTeacher = false,
  userName = '',
  userAvatar = '',
  isMuted = false,
  isHandRaised = false,
  isSpeaking = false,
  isMaximized = false,
  isScreenShare = false,
  canControlAudio = false,
  isRemoteAudioEnabled = true,
  onToggleMaximize,
  onToggleAudio
}: VideoStreamProps) {
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!videoRef.current || !videoTrack) return
    
    videoTrack.play(videoRef.current)
    
    return () => {
      videoTrack.stop()
    }
  }, [videoTrack])
  return (
    <div
    className={cn(
      "relative  rounded-[3rem] mx-5  overflow-hidden bg-muted transition-all duration-200",
      isLocal ?'max-h-[70vh] w-full min-h-[70vh]': 'max-h-[20vh] min-h-[20vh] w-[30rem]',
      isMaximized ? "col-span-2 row-span-2" : "",
      isScreenShare ? "col-span-3 row-span-3" : "",
      isSpeaking ? "ring-2 ring-green-500" : "",
      "hover:ring-2 hover:ring-primary/50 cursor-pointer"
    )}
    onClick={onToggleMaximize}>
      <div ref={videoRef} className="w-full h-full ">
        {!videoTrack && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      {isLocal && <div className="absolute left-4 top-4 animate-fade-in">
        <div className="rounded-3xl bg-white/50 px-4 py-2 backdrop-blur-sm">
          <p className="text-sm">Lead Designer</p>
          <p className="font-semibold">{userName}</p>
        </div>
      </div>
     }
    </div>
  )
}

