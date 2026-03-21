import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { AdsService } from '../services/ads.service';
export declare class AdsMustBeUniqueValidator implements ValidatorConstraintInterface {
    private readonly adsService;
    constructor(adsService: AdsService);
    validate(value: number, args: ValidationArguments): Promise<boolean>;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
