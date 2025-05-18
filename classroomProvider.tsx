import AgoraRTC from 'agora-rtc-sdk-ng'
import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack
} from 'agora-rtc-sdk-ng'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface UseAgoraReturn {
  agoraClient: IAgoraRTCClient | null
  localAudioTrack: IMicrophoneAudioTrack | null
  localVideoTrack: ICameraVideoTrack | null
  joinChannel: (classroomId: string, token: string) => Promise<number>
}

const useAgora = (classroomId: string, token: string): UseAgoraReturn => {
  const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient | null>(null)
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | null>(null)
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | null>(null)

  useEffect(() => {
    const initAgora = async () => {
      try {
        const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
        setAgoraClient(client)
        await client.join(process.env.NEXT_PUBLIC_AGORA_APP_ID!, classroomId, token, null)
        setupEventListeners(client)
      } catch (error) {
        console.error('Error initializing Agora:', error)
        toast.error('Failed to initialize Agora')
      }
    }

    if (classroomId && token) {
      initAgora()
    }

    return () => {
      // Cleanup function
      if (localAudioTrack) {
        localAudioTrack.close()
        setLocalAudioTrack(null)
      }
      if (localVideoTrack) {
        localVideoTrack.close()
        setLocalVideoTrack(null)
      }
      if (agoraClient) {
        agoraClient.removeAllListeners()
        agoraClient.leave()
      }
    }
  }, [classroomId, token, localAudioTrack, localVideoTrack])

  const joinChannel = async (classroomId: string, token: string): Promise<number> => {
    if (!agoraClient) {
      toast.error('Agora client not initialized')
      return 0
    }

    try {
      // Ensure clean state before joining
      if (localAudioTrack) {
        localAudioTrack.close()
        setLocalAudioTrack(null)
      }
      if (localVideoTrack) {
        localVideoTrack.close()
        setLocalVideoTrack(null)
      }

      // Join the channel
      const uid = await agoraClient.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID!, 
        classroomId,
        token,
        null
      )
      console.log('Successfully joined channel:', classroomId, 'with uid:', uid)

      // Create and publish tracks
      const [audioTrack, videoTrack] = await Promise.all([
        AgoraRTC.createMicrophoneAudioTrack({
          encoderConfig: {
            sampleRate: 48000,
            stereo: true,
            bitrate: 128
          }
        }),
        AgoraRTC.createCameraVideoTrack({
          encoderConfig: {
            width: 640,
            height: 360,
            frameRate: 30,
            bitrateMin: 400,
            bitrateMax: 1000
          }
        })
      ])

      setLocalAudioTrack(audioTrack)
      setLocalVideoTrack(videoTrack)

      await agoraClient.publish([audioTrack, videoTrack])
      console.log('Successfully published local tracks')

      return Number(uid)
    } catch (error) {
      console.error('Error joining channel:', error)
      toast.error('Failed to join the classroom')
      throw error
    }
  }

  const setupEventListeners = (client: IAgoraRTCClient) => {
    client.on('user-published', async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      try {
        await client.subscribe(user, mediaType)
        console.log('Subscribed to user:', user.uid, 'mediaType:', mediaType)

        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack
          if (remoteVideoTrack) {
            requestAnimationFrame(() => {
              const playerContainer = document.getElementById(`remote-video-${user.uid}`)
              if (playerContainer) {
                remoteVideoTrack.play(playerContainer)
              }
            })
          }
        }
        if (mediaType === 'audio') {
          const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack
          remoteAudioTrack?.play()
        }
      } catch (error) {
        console.error('Error handling user-published event:', error)
      }
    })

    client.on('user-unpublished', (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      if (mediaType === 'video') {
        const playerContainer = document.getElementById(`remote-video-${user.uid}`)
        if (playerContainer) {
          playerContainer.innerHTML = ''
        }
      }
      if (mediaType === 'audio') {
        user.audioTrack?.stop()
      }
    })

    client.on('user-left', (user: IAgoraRTCRemoteUser) => {
      const playerContainer = document.getElementById(`remote-video-${user.uid}`)
      if (playerContainer) {
        playerContainer.innerHTML = ''
      }
    })
  }

  return {
    agoraClient,
    localAudioTrack,
    localVideoTrack,
    joinChannel
  }
}

export default useAgora