export class ProcessedQueueItemDto {
  constructor(
    public readonly createdAdId: number,
    public readonly queueItemId: number,
  ) {}
}
