export class MessageVM {
  public constructor(
    public _id: string,
    public text: string,
    public isSender: boolean
  ) {}
}
