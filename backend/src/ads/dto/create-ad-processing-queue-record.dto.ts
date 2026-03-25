import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  Validate,
} from 'class-validator';
import { AdsProcessingQueueUrlMustBeUniqueValidator } from '../validators/ads-processing-queue-url-must-be-unique.validator';

export class CreateAdProcessingQueueRecordDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @MaxLength(500)
  @Validate(AdsProcessingQueueUrlMustBeUniqueValidator)
  url: string;
}
