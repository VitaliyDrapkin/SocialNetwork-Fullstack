import { Message } from "./message.model";

export class Conversation {
  _id: string;
  messages: Message[];
  companion: Companion;
}

export interface MessengerItem {
  companion: Companion;
  lastMessage: string;
}

interface Companion {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}
