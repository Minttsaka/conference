import { SessionPayload } from "@/lib/session";
import type {  ILocalAudioTrack, ILocalVideoTrack, IMicrophoneAudioTrack, IRemoteAudioTrack, IRemoteVideoTrack, } from "agora-rtc-sdk-ng"

export interface VideoRoomProps {
  meetingId: string
  // user:SessionPayload
}

// export interface VideoStreamProps {
//   user: IAgoraRTCRemoteUser | null |undefined
//   videoTrack: any
//   isLocal: boolean
//   meetingId: string
//   userName: string
//   userAvatar: string
//   isMuted: boolean
//   isHandRaised: boolean
//   isSpeaking: boolean
//   isMaximized: boolean
//   onToggleMaximize: () => void
// }

export interface VideoStreamProps {
  videoTrack?: ILocalVideoTrack | IRemoteVideoTrack | null;
  audioTrack?: IMicrophoneAudioTrack | ILocalAudioTrack | IRemoteAudioTrack | null;
  isLocal: boolean;
  maximisedUser:string | null;
  userName?: string;
  userId:string;
  userAvatar: string;
  isVideoOff: boolean;
  isMuted: boolean;
  isHandRaised?: boolean;
  isSpeaking: boolean;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onMuteRemoteUser: () => void;
  className?: string;
}



export interface ChatMessageProps {
  id: string
  sender: string
  image: string
  message: string
  timestamp: string
}

