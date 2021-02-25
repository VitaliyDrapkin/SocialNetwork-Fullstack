import { ChatResponse, ConversationResponse, Message } from "../Model/message";
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
};
