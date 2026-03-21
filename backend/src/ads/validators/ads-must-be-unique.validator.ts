import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AdsService } from '../services/ads.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'AdsMustBeUniqueValidator', async: true })
export class AdsMustBeUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly adsService: AdsService) {}

  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    const exists = await this.adsService.findByAdId(value);
    return !exists;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Ad ID must be unique';
  }
}
