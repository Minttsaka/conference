import { useEffect, useRef } from 'react'
import { ICameraVideoTrack, IRemoteVideoTrack } from 'agora-rtc-sdk-ng'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Mic, MicOff, Hand } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <Card 
      className={cn(
        "relative overflow-hidden bg-muted transition-all duration-200",
        isMaximized ? "col-span-2 row-span-2" : "",
        isScreenShare ? "col-span-3 row-span-3" : "",
        isSpeaking ? "ring-2 ring-green-500" : "",
        "hover:ring-2 hover:ring-primary/50 cursor-pointer"
      )}
      onClick={onToggleMaximize}
    >
      <div ref={videoRef} className="w-full h-full min-h-[200px]">
        {!videoTrack && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center gap-2">
          {isTeacher && (
            <span className="text-xs font-medium bg-primary/20 text-primary px-1.5 py-0.5 rounded">
              Teacher
            </span>
          )}
          <span className="text-sm font-medium text-white">{userName}</span>
          <div className="ml-auto flex items-center gap-2">
            {isHandRaised && (
              <Hand className="h-4 w-4 text-yellow-500 animate-bounce" />
            )}
            {isMuted ? (
              <MicOff className="h-4 w-4 text-red-500" />
            ) : (
              <Mic className={cn(
                "h-4 w-4",
                isSpeaking ? "text-green-500" : "text-white"
              )} />
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

