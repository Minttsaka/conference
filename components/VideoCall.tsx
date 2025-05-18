'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { VideoStream } from '@/components/video-stream'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mic, MicOff, Video, VideoOff, Hand, ScreenShare, Users, Settings, LogOut, Share } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getOrCreateUserId } from '@/lib/userGn'
import { useAgora } from '@/hook/useAgora'
import AgoraRTC from 'agora-rtc-sdk-ng'

export default function VideoCallPage({ 
  classroomId 
}: {
  classroomId: string
}) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const userId = getOrCreateUserId()

  const [maximizedUser, setMaximizedUser] = useState<string | null>(null)

  const {
    client,
    localVideoTrack,
    localAudioTrack,
    remoteUsers,
    speakingUsers,
    raisedHands,
    joinChannel,
    leaveChannel,
    toggleAudio,
    toggleVideo,
    toggleHand,
    setupEventListeners,
    toggleScreenShare,
    shareLink,
    isScreenSharing
  } = useAgora({
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    channel: classroomId,
    token: token!,
    uid: userId
  })

  useEffect(() => {
    if (token && client) {
      setupEventListeners(client)
      joinChannel()
    }

  }, [token, client, joinChannel, leaveChannel, setupEventListeners])

  const isMuted = localAudioTrack ? !localAudioTrack.enabled : true
  const isVideoOff = localVideoTrack ? !localVideoTrack.enabled : true
  const isHandRaised = raisedHands.has(userId)

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }}>
          <div className="h-full w-full backdrop-blur-sm bg-black/30 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
              <VideoStream
                user={null}
                videoTrack={localVideoTrack}
                isLocal
                userName={'You'}
                userAvatar={''}
                isMuted={isMuted}
                isHandRaised={isHandRaised}
                isSpeaking={speakingUsers.has(userId)}
                isMaximized={maximizedUser === 'local'}
                onToggleMaximize={() => setMaximizedUser(maximizedUser === 'local' ? null : 'local')}
              />

              {remoteUsers.map((user) => (
                <VideoStream
                  key={user.uid}
                  user={user}
                  videoTrack={user.videoTrack}
                  userName={`User ${user.uid}`}
                  isMuted={!user.hasAudio}
                  isHandRaised={raisedHands.has(user.uid.toString())}
                  isSpeaking={speakingUsers.has(user.uid.toString())}
                  isMaximized={maximizedUser === user.uid.toString()}
                  onToggleMaximize={() => setMaximizedUser(
                    maximizedUser === user.uid.toString() ? null : user.uid.toString()
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Card className="border-t border-white/10 bg-black/80 backdrop-blur-md">
        <div className="p-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              onClick={toggleAudio}
              className={cn(
                "h-12 w-12 rounded-full",
                isMuted && "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500"
              )}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="lg"
              onClick={toggleVideo}
              className={cn(
                "h-12 w-12 rounded-full",
                isVideoOff && "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500"
              )}
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>

            <Button
              variant={isScreenSharing ? "destructive" : "secondary"}
              size="lg"
              onClick={toggleScreenShare}
              className={cn(
                "h-12 w-12 rounded-full",
                isScreenSharing && "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-500"
              )}
            >
              <ScreenShare className="h-5 w-5" />
            </Button>

            <Button
              variant={isHandRaised ? "destructive" : "secondary"}
              size="lg"
              onClick={() => toggleHand(userId)}
              className={cn(
                "h-12 w-12 rounded-full",
                isHandRaised && "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-500"
              )}
            >
              <Hand className="h-5 w-5" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="h-12 w-12 rounded-full"
            >
              <Users className="h-5 w-5" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="h-12 w-12 rounded-full"
              onClick={shareLink}
            >
              <Share className="h-5 w-5" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="h-12 w-12 rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={leaveChannel}
              className="h-12 w-12 rounded-full"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

