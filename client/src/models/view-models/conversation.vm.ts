import { MessageVM } from "./message.vm";

export interface ConversationVM {
  _id: string;
  messages: MessageVM[];
  companion: CompanionVM;
}

interface CompanionVM {
  _id: string;
  firstName: string;
  lastName: string;
  profileImg: string;
}

export class MessengerItemVM {
  public constructor(
    public userId: string,
    public userFirstName: string,
    public userLastName: string,
    public profileImg: string,
    public lastMessage: string
  ) {}
}
