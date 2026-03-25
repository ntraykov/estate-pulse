import { AdType } from '../enums/ad-type.enum';
import { AdvertiserType } from '../enums/advertiser-type.enum';
import { OwnershipType } from '../enums/ownership-type.enum';

export class ScrapedAdDto {
  adId: number;
  url: string;
  type: AdType;
  advertiserType: AdvertiserType;
  ownershipType: OwnershipType;
  area: number;
  price: number;
  rooms: number;
  floor: string;
  czynsz: number;
  address: string;
  description: string;
}
