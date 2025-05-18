import React, { useCallback, useEffect, useRef, useState } from 'react';
import AgoraRTC, { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';

interface Props {
  classroomId: string;
  tokenFromUrl: string | null;
}

const VideoChat: React.FC<Props> = ({ classroomId, tokenFromUrl }) => {
  const clientRef = useRef<any>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoContainer = useRef<HTMLDivElement>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<any>(null);
  const [agoraClient, setAgoraClient] = useState<any>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  const initializeClient = useCallback(() => {
    if (!clientRef.current) {
      clientRef.current = AgoraRTC.createClient({ 
        mode: 'rtc', 
        codec: 'vp8',
        role: 'host' // Ensure proper role for video publishing
      })
      
      // Enable volume detection
      clientRef.current.enableAudioVolumeIndicator()
    }
   // setupEventListeners(clientRef.current)
  }, [])

  const joinChannel = async (channelId: string, token: string | null) => {
    // Your join channel logic here...
    try {
      await clientRef.current.join(token, channelId, null, null);
      // Get local video track
      const localTrack = await clientRef.current.publish(
        {
          video: true,
          audio: true,
        },
        {
          encoderConfig: {
            width: 640,
            height: 480,
            frameRate: 15,
            bitrate: 500,
          },
        }
      );
      setLocalVideoTrack(localTrack.videoTrack);
    } catch (error) {
      console.error('Error joining channel:', error);
    }
  };

  const leaveChannel = async () => {
    // Your leave channel logic here...
    await clientRef.current.leave();
  };

  useEffect(() => {
    if (!clientRef.current?.connectionState) {
      if(tokenFromUrl && localVideoContainer.current){
        initializeClient();
        joinChannel(classroomId, tokenFromUrl);

        // Render local video if track exists
        if (localVideoTrack) {
          localVideoTrack.play(localVideoContainer.current);
        }
      }
    }

    return () => {
      if (clientRef.current?.connectionState === 'CONNECTED') {
        localVideoTrack?.stop();
      }
    }
  }, [joinChannel, initializeClient, leaveChannel, localVideoTrack]);

  useEffect(() => {
    if (agoraClient) {
      const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
        await agoraClient.subscribe(user, mediaType);
        setRemoteUsers(prev => [...prev.filter(u => u.uid !== user.uid), user]);
      };

      const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      };

      const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
        setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
      };

      agoraClient.on('user-published', handleUserPublished);
      agoraClient.on('user-unpublished', handleUserUnpublished);
      agoraClient.on('user-left', handleUserLeft);

      return () => {
        agoraClient.off('user-published', handleUserPublished);
        agoraClient.off('user-unpublished', handleUserUnpublished);
        agoraClient.off('user-left', handleUserLeft);
      };
    }
  }, [agoraClient]);


  return (
    <div className="flex">
      <div className="w-1/2">
        <div ref={localVideoContainer} className="w-full h-full" />
      </div>
      <div className="w-1/2">
        {remoteUsers.map((user) => (
          <VideoStream key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};

const VideoStream: React.FC<{ user: IAgoraRTCRemoteUser }> = ({ user }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoTrack = user.videoTrack;
    if (videoTrack) {
      videoTrack.play(videoRef.current!);
    }

    return () => {
      videoTrack?.stop();
    };
  }, [user.videoTrack]);

  return (
    <video ref={videoRef} autoPlay className="w-full h-full" />
  );
};

export default VideoChat;

