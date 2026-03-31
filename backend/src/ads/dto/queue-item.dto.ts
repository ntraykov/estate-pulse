export class QueueItemDto {
  constructor(
    public id: number,
    public url: string,
    public createdAt: Date,
  ) {}
}
