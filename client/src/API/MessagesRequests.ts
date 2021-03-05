import {
  ConversationVM,
  MessengerItemVM,
} from "./../models/view-models/conversation.vm";
import {
  Conversation,
  MessengerItem,
} from "./../models/server-models/conversation.model";
import { MessageVM } from "./../models/view-models/message.vm";

import { getValidToken, instance } from "./ApiSettings";

export const MessagesRequests = {
  getConversation: async (userId: string): Promise<ConversationVM> => {
    const response = await instance.get<Conversation>(`/messages/${userId}`, {
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
      const newMessage = new MessageVM(
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

  getMessengerData: async (): Promise<MessengerItemVM[]> => {
    const response = await instance.get<MessengerItem[]>(`/messages/`, {
      headers: {
        Authorization: `Bearer ${await getValidToken()}`,
      },
    });
    const messengers = response.data.map((messenger) => {
      return new MessengerItemVM(
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
