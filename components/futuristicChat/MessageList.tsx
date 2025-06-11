import { Message } from "@/types/message"
import MessageBubble from "./MessageBubble"

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
