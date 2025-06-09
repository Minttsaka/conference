import { useState, useEffect, useCallback, useRef } from 'react'
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  ILocalVideoTrack,
  ILocalTrack,

} from 'agora-rtc-sdk-ng'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import type { Message, TranscriptionSettings } from "@/types/room"
import { getOrCreateUserId } from '@/lib/userGn'
import { enhanceTranscriptionAction } from '@/lib/action'
import { publishMessage } from '@/components/demo/agora'

export interface UseAgoraProps {
  appId: string
  channel: string
  token: string
  uid?: string
  isHost:boolean
}

export interface UseAgoraReturn {
  client: IAgoraRTCClient | null
  localVideoTrack: ICameraVideoTrack | null
  localAudioTrack: IMicrophoneAudioTrack | null
  screenVideoTrack: ILocalVideoTrack | null
  remoteUsers: IAgoraRTCRemoteUser[]
  speakingUsers: Set<string>
  joinChannel: () => Promise<void>
  leaveChannel: () => Promise<void>
  messages:Message[]
  updateSettings : (newSettings: Partial<TranscriptionSettings>) => void
  settings:TranscriptionSettings
  toggleAudio: () => Promise<void>
  toggleVideo: () => Promise<void>
  shareLink: (classroomId:string) => void
  setupEventListeners: (client: IAgoraRTCClient) => void
  isScreenSharing: boolean
}

const VOLUME_THRESHOLD = 50 // Adjust this value based on testing

export function useAgora({ appId, channel, token, uid, isHost }: UseAgoraProps): UseAgoraReturn {
  const [client, setClient] = useState<IAgoraRTCClient | null>(null)
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | null>(null)
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | null>(null)
  const [screenVideoTrack, setScreenVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([])
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [speakingUsers, setSpeakingUsers] = useState<Set<string>>(new Set())
  const [messages, setMessages] = useState<Message[]>([])
  const [settings, setSettings] = useState<TranscriptionSettings>({
    fontSize: 16,
    showSpeakerNames: true,
    highlightCurrentSpeaker: true,
    transcriptionLanguage: "en-US",
    aiEnhancement: true,
  })

  const router = useRouter()
  
  const isMounted = useRef(true)
  const joinInProgress = useRef(false)
  const volumeDetectionInterval = useRef<NodeJS.Timeout>()

  const audioContextRef = useRef<AudioContext | null>(null)
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null)
  const recognitionRef = useRef<any>(null) // WebSpeechAPI recognition object

  useEffect(() => {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8',role: 'host' })
    setClient(client)

    return () => {
      isMounted.current = false
      if (volumeDetectionInterval.current) {
        clearInterval(volumeDetectionInterval.current)
      }
      client.removeAllListeners()
      if (client.connectionState === 'CONNECTED') {
        client.leave()
      }
    }
  }, [])

  const setupEventListeners = useCallback((client: IAgoraRTCClient) => {
    // Enable volume detection
    client.enableAudioVolumeIndicator()

    client.on("volume-indicator", (volumes) => {
      const speaking = new Set<string>()
      volumes.forEach((volume) => {
        if (volume.level > VOLUME_THRESHOLD) {
          speaking.add(volume.uid.toString())
        }
      })
      setSpeakingUsers(speaking)
    })

    client.on('user-published', async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      try {
        await client.subscribe(user, mediaType)
        console.log('Subscribed to user:', user.uid, 'mediaType:', mediaType)

        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack
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
          user.audioTrack?.play()
        }

        // Update remote users list
        setRemoteUsers(prev => {
          if (prev.find(u => u.uid === user.uid)) {
            return prev.map(u => u.uid === user.uid ? user : u)
          }
          return [...prev, user]
        })
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
      
      // Update remote users list
      setRemoteUsers(prev => prev.map(u => u.uid === user.uid ? user : u))
    })

    client.on('user-left', (user: IAgoraRTCRemoteUser) => {
      const playerContainer = document.getElementById(`remote-video-${user.uid}`)
      if (playerContainer) {
        playerContainer.innerHTML = ''
      }
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid))
      setSpeakingUsers(prev => {
        const next = new Set(prev)
        next.delete(user.uid.toString())
        return next
      })

    })

 
      // Initialize speech recognition
    initializeSpeechRecognition()
  }, [])

  const joinChannel = useCallback(async () => {
    if (!client || joinInProgress.current) return

    try {
      joinInProgress.current = true

      // Clean up existing tracks
      if (localAudioTrack) {
        localAudioTrack.stop()
        localAudioTrack.close()
      }
      if (localVideoTrack) {
        localVideoTrack.stop()
        localVideoTrack.close()
      }
      if (screenVideoTrack) {
        screenVideoTrack.stop()
        screenVideoTrack.close()
      }

      // Leave any existing channel
      if (client.connectionState === 'CONNECTED') {
        await client.leave()
      }

      // Join with retry logic
      let retries = 3
      while (retries > 0) {
        try {
          await client.join(appId, channel, token, uid)
          break
        } catch (error: any) {
          if (error.code === 'OPERATION_ABORTED' && retries > 1) {
            retries--
            await new Promise(resolve => setTimeout(resolve, 1000))
            continue
          }
          throw error
        }
      }

      if (!isMounted.current) return

      // Create tracks
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
        encoderConfig: {
          sampleRate: 48000,
          stereo: true,
          bitrate: 128
        }
      }).catch(error => {
        console.error('Failed to create audio track:', error)
        return null
      })

      const videoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: {
          width: 640,
          height: 360,
          frameRate: 30,
          bitrateMin: 400,
          bitrateMax: 1000
        },
        optimizationMode: 'detail'
      }).catch(error => {
        console.error('Failed to create video track:', error)
        return null
      })

      if (!isMounted.current) {
        audioTrack?.close()
        videoTrack?.close()
        return
      }

      if (audioTrack) setLocalAudioTrack(audioTrack)
      if (videoTrack) setLocalVideoTrack(videoTrack)

      // Publish tracks
      const tracksToPublish: ILocalTrack[] = []
      if (audioTrack) tracksToPublish.push(audioTrack)
      if (videoTrack) tracksToPublish.push(videoTrack)

      if (tracksToPublish.length > 0) {
        await client.publish(tracksToPublish)
      }

      // Set up event handlers
      if (isMounted.current) {
        setupEventListeners(client)
      }

      toast.success('Successfully joined the channel')
    } catch (error) {
      console.error('Error joining channel:', error)
      toast.error('Failed to join the channel')
      // Cleanup on error
      if (localAudioTrack) {
        localAudioTrack.close()
        setLocalAudioTrack(null)
      }
      if (localVideoTrack) {
        localVideoTrack.close()
        setLocalVideoTrack(null)
      }
    } finally {
      joinInProgress.current = false
    }
  }, [client, appId, channel, token, uid, localAudioTrack, localVideoTrack, screenVideoTrack, setupEventListeners])

  const leaveChannel = useCallback( async () => {
    if (!client) return

    try {
      // Stop and close tracks
      if (localAudioTrack) {
        await localAudioTrack.stop()
        await localAudioTrack.close()
      }
      if (localVideoTrack) {
        await localVideoTrack.stop()
        await localVideoTrack.close()
      }
      if (screenVideoTrack) {
        await screenVideoTrack.stop()
        await screenVideoTrack.close()
      }
      
      if (client.connectionState === 'CONNECTED') {
        await client.leave()
      }
      
      setLocalAudioTrack(null)
      setLocalVideoTrack(null)
      setScreenVideoTrack(null)
      setRemoteUsers([])
      setIsScreenSharing(false)
      setSpeakingUsers(new Set())
      
      toast.success('Left the channel')
      router.push('/start')
    } catch (error) {
      console.error('Error leaving channel:', error)
      toast.error('Failed to leave the channel')
    }
  }, [client, localAudioTrack, localVideoTrack, screenVideoTrack])

  const toggleAudio = useCallback(async () => {
    if (!localAudioTrack) return
    
    try {
      await localAudioTrack.setEnabled(!localAudioTrack.enabled)
      toast.success(localAudioTrack.enabled ? 'Microphone unmuted' : 'Microphone muted')
    } catch (error) {
      console.error('Error toggling audio:', error)
      toast.error('Failed to toggle audio')
    }
  }, [localAudioTrack])

  const toggleVideo = useCallback(async () => {
    if (!localVideoTrack) return
    
    try {
      await localVideoTrack.setEnabled(!localVideoTrack.enabled)
      toast.success(localVideoTrack.enabled ? 'Camera turned on' : 'Camera turned off')
    } catch (error) {
      console.error('Error toggling video:', error)
      toast.error('Failed to toggle video')
    }
  }, [localVideoTrack])

  const shareLink = (classroomId:string) => {
    // Implement share link functionality here
    const link = `http://localhost:3002/join/${classroomId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const initializeSpeechRecognition = useCallback(() => {
    try {
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        throw new Error("Speech recognition is not supported in this browser");
      }
  
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
  
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = settings.transcriptionLanguage;
  
      recognition.onresult = async (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";
  
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          let processedText = finalTranscript

          // Apply AI enhancement if enabled
          if (settings.aiEnhancement) {
            try {
              processedText = await enhanceTranscriptionAction(finalTranscript)
            } catch (err) {
              console.error("Error enhancing transcription:", err)
              // Fall back to original text
              processedText = finalTranscript
            }
          }

          // Add message
          const newMessage: Message = {
            id: crypto.randomUUID(),
            participantId: getOrCreateUserId(),
            participantName: getOrCreateUserId().split("-")[4],
            text: processedText,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, newMessage])
        }
  
        
      };
  
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "no-speech") {
          recognition.stop();
          setTimeout(() => {
            recognition.start();
          }, 1000);
        }
      };
  
      recognition.start();
      console.log("Speech recognition started");
    } catch (err) {
      console.error("Error initializing speech recognition:", err);
    }
  }, [settings.transcriptionLanguage]); // Removed getOrCreateUserId() from dependencies
  
  

  const updateSettings = useCallback((newSettings: Partial<TranscriptionSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }, [])

  
  return {
    client,
    localVideoTrack,
    updateSettings,
    localAudioTrack,
    screenVideoTrack,
    messages,
    shareLink,
    remoteUsers,
    speakingUsers,
    settings,
    joinChannel,
    leaveChannel,
    toggleAudio,
    toggleVideo,
    setupEventListeners,
    isScreenSharing
  }
}

