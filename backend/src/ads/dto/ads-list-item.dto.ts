export class AdsListItemDto {
  constructor(
    public readonly id: number,
    public readonly settlement: string,
    public readonly address: string,
    public readonly price: number,
    public readonly area: number,
    public readonly rooms: number | null,
    public readonly mainImageUrl: string,
  ) {}
}
