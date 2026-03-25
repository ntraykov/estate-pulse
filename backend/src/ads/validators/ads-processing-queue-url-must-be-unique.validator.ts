import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AdsService } from '../services/ads.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({
  name: 'AdsProcessingQueueUrlMustBeUniqueValidator',
  async: true,
})
export class AdsProcessingQueueUrlMustBeUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly adsService: AdsService) {}

  async validate(url: string): Promise<boolean> {
    const exists =
      await this.adsService.isAdProcessingQueueUrlAlreadyEnqueued(url);
    return !exists;
  }

  defaultMessage(): string {
    return 'URL must be unique';
  }
}
