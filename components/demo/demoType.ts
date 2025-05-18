export type Reaction = {
    emoji: string;
    user: string;
  };
  
  export type MessageFile = {
    name: string;
    url: string;
  };
  
  export type Message = {
    id: string;
    sender: string;
    text: string;
    type:string,
    timestamp: string;
    isCurrentUser: boolean;
    reactions: Reaction[];
    replyTo: string | null;
    replyToSender: string | null;
    file: MessageFile | null;
  };
  
  export type MessageInput = {
    text: string;
    sender: string;
    reactions:Reaction[]
    type:string,
    isCurrentUser: boolean;
    replyToId?: string | null;
    replyToSender?: string | null;
    replyTo?: string | null;
    file?: {
      name: string;
      url: string;
    } | null;
  };