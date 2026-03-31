import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAdDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  adId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  url: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  settlement: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  adType: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  propertyType: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  area?: number;

  @IsInt()
  @IsOptional()
  rooms?: number;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  address?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsObject()
  @IsOptional()
  rawDetailsJson?: Record<string, unknown>;

  @IsObject()
  @IsOptional()
  rawScrapedJson?: Record<string, unknown>;

  @IsString()
  @IsOptional()
  rawHtml?: string;
}
