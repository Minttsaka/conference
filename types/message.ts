
export type Message = {
  id: string
  text: string
  sender: string
  senderId: string
  timestamp: Date
  isCurrentUser: boolean
  reactions: { emoji: string; userId: string }[]
  replyTo?: string
  replyToId?: string
  replyToSender?: string
  file?: {
    name: string
    url: string
  }
}