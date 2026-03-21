import { OwnershipType } from '../enums/ownership-type.enum';
import { AdvertiserType } from '../enums/advertiser-type.enum';
import { AdType } from '../enums/ad-type.enum';
export declare class CreateAdDto {
    settlementId: number;
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
