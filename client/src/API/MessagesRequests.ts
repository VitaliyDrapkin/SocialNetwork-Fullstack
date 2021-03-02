import {
  ChatResponse,
  ConversationResponse,
  Message,
  MessengerItemResponse,
  MessengerItem,
} from "../models/message";
import { getValidToken, instance } from "./ApiSettings";

export const MessagesRequests = {
  getConversation: async (userId: string): Promise<ConversationResponse> => {
    const response = await instance.get<ChatResponse>(`/messages/${userId}`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
    const companion = {
      _id: response.data.companion._id,
      firstName: response.data.companion.firstName,
      lastName: response.data.companion.lastName,
      profileImg: response.data.companion.profileImage,
    };
    const messages = response.data.messages.map((message) => {
      const newMessage = new Message(
        message._id,
        message.text,
        message.userId === userId ? false : true
      );
      return newMessage;
    });
    const conversation = {
      _id: response.data._id,
      messages,
      companion,
    };
    return conversation;
  },

  getMessengerData: async (): Promise<MessengerItem[]> => {
    const response = await instance.get<MessengerItemResponse[]>(`/messages/`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
    const messengers = response.data.map((messenger) => {
      return new MessengerItem(
        messenger.companion._id,
        messenger.companion.firstName,
        messenger.companion.lastName,
        messenger.companion.profileImage,
        messenger.lastMessage
      );
    });
    return messengers;
  },
};
