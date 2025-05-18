export interface Participant {
    id: string
    name: string
    isSelf: boolean
    isAudioOn: boolean
    isVideoOn: boolean
  }
  
  export interface Message {
    id: string
    participantId: string
    participantName: string
    text: string
    timestamp: Date
  }
  
  export interface TranscriptionSettings {
    fontSize: number
    showSpeakerNames: boolean
    highlightCurrentSpeaker: boolean
    transcriptionLanguage: string
    aiEnhancement: boolean
  }
  
  export interface AgoraRtcToken {
    token: string
    uid: number
    channel: string
    expiry: number
  }
  
  export interface GoogleSpeechConfig {
    languageCode: string
    alternativeLanguageCodes?: string[]
    model?: string
    useEnhanced?: boolean
  }
  
  export interface TranscriptionResult {
    text: string
    isFinal: boolean
    confidence: number
    speakerId?: string
  }
  
  