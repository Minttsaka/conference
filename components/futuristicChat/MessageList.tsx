import MessageBubble from "./MessageBubble"

type Message = {
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

type MessageListProps = {
  messages: Message[]
  setReplyingTo: (message: Message | null) => void
  addReaction: (messageId: string, emoji: string) => void
  currentUserId: string
}

export default function MessageList({ messages, setReplyingTo, addReaction, currentUserId }: MessageListProps) {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          index={index}
          setReplyingTo={setReplyingTo}
          addReaction={addReaction}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  )
}
