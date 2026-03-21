import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { OwnershipType } from '../enums/ownership-type.enum';
import { AdvertiserType } from '../enums/advertiser-type.enum';
import { AdType } from '../enums/ad-type.enum';
import { AdsMustBeUniqueValidator } from '../validators/ads-must-be-unique.validator';

export class CreateAdDto {
  @IsInt()
  @IsNotEmpty()
  settlementId: number;

  @IsInt()
  @IsNotEmpty()
  @Validate(AdsMustBeUniqueValidator)
  adId: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([AdType.SALE, AdType.RENT])
  type: AdType;

  @IsString()
  @IsNotEmpty()
  @IsIn([AdvertiserType.PRIVATE, AdvertiserType.AGENCY])
  advertiserType: AdvertiserType;

  @IsString()
  @IsNotEmpty()
  @IsIn([OwnershipType.FULL, OwnershipType.JOINT])
  ownershipType: OwnershipType;

  @IsNumber()
  @IsNotEmpty()
  area: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  rooms: number;

  @IsString()
  @IsNotEmpty()
  floor: string;

  @IsNumber()
  @IsOptional()
  czynsz: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
