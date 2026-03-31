import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AdsQueueQueries } from '../queries/ads-queue.queries';

@Injectable()
@ValidatorConstraint({
  name: 'AdsQueueUrlMustBeUniqueValidator',
  async: true,
})
export class AdsQueueUrlMustBeUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly adsQueueQueries: AdsQueueQueries) {}

  async validate(url: string): Promise<boolean> {
    const exists = await this.adsQueueQueries.findByUrl(url);
    return !exists;
  }

  defaultMessage(): string {
    return 'URL must be unique';
  }
}
