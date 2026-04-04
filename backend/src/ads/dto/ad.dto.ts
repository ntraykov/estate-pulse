import { ImageDto } from './image.dto';

export class AdDto {
  constructor(
    public readonly id: number,
    public readonly adId: string,
    public readonly url: string,
    public readonly settlement: string,
    public readonly adType: string,
    public readonly propertyType: string,
    public readonly price: number,
    public readonly area: number,
    public readonly rooms: number,
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly firstSeenAt: Date,
    public readonly images: ImageDto[],
    public readonly rawDetails: Record<string, string>,
  ) {}
}
