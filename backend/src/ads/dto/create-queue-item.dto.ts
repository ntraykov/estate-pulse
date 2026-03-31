import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  Validate,
} from 'class-validator';
import { AdsQueueUrlMustBeUniqueValidator } from '../validators/ads-queue-url-must-be-unique.validator';

export class CreateQueueItemDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @MaxLength(500)
  @Validate(AdsQueueUrlMustBeUniqueValidator)
  url: string;
}
