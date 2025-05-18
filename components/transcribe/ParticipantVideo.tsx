"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MicOff, VideoOff } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ILocalAudioTrack, ILocalVideoTrack, IMicrophoneAudioTrack, IRemoteAudioTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng"

interface videoTrackVideoProps {
  videoTrack : ILocalVideoTrack | IRemoteVideoTrack| undefined,
  audioTrack : IMicrophoneAudioTrack | ILocalAudioTrack | IRemoteAudioTrack | undefined,
  isLocal: boolean
  userId:string
}

export default function videoTrackVideo({ audioTrack,userId, videoTrack, isLocal }: videoTrackVideoProps) {
  const videoRef = useRef<HTMLDivElement>(null)

  // Set up video player when component mounts
  useEffect(() => {
    if (videoTrack && videoRef.current) {
      // In a real implementation, you would get the videoTrack from Agora
      // and play it in the videoRef element

      // For demonstration purposes, we'll just show a placeholder
      const videoElement = document.createElement("div")
      videoElement.className = "w-full h-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center"
      videoElement.innerHTML = '<span class="text-muted-foreground">Remote Video</span>'

      // Clear previous content
      if (videoRef.current.firstChild) {
        videoRef.current.removeChild(videoRef.current.firstChild)
      }

      // Add new video element
      videoRef.current.appendChild(videoElement)

      // Cleanup function
      return () => {
        if (videoRef.current && videoRef.current.firstChild) {
          videoRef.current.removeChild(videoRef.current.firstChild)
        }
      }
    }
  }, [videoTrack])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative aspect-video bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
      {videoTrack ? (
          <div ref={videoRef} className="w-full h-full">
            {isLocal && (
              // For self video, we'll show a placeholder
              <div className="w-full h-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                <span className="text-muted-foreground">Your Video</span>
              </div>
            )}
          </div>
        ) : (
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl">{userId.charAt(0)}</AvatarFallback>
          </Avatar>
        )}

        <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
          <div className="bg-black/50 text-white px-2 py-1 rounded-md text-sm">
            {userId}
          </div>
        </div>

        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          {!audioTrack && (
            <div className="bg-red-500/80 p-1 rounded-full">
              <MicOff className="h-3 w-3 text-white" />
            </div>
          )}
          {!videoTrack && (
            <div className="bg-red-500/80 p-1 rounded-full">
              <VideoOff className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

