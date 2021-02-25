export class Message {
  public constructor(
    public _id: string,
    public text: string,
    public isSender: boolean
  ) {}
}

export class MessageResponse {
  public constructor(
    public _id: string,
    public userId: string,
    public text: string
  ) {}
}

export class ConversationResponse {
  public constructor(
    public _id: string,
    public messages: Message[],
    public companion: {
      _id: string;
      firstName: string;
      lastName: string;
      profileImg: string;
    }
  ) {}
}

export class ChatResponse {
  public constructor(
    public _id: string,
    public messages: MessageResponse[],
    public companion: {
      _id: string;
      firstName: string;
      lastName: string;
      profileImage: string;
    }
  ) {}
}

export class MessengerItem {
  public constructor(
    public userId: string,
    public userFirstName: string,
    public userLastName: string,
    public lastMessage: string
  ) {}
}
