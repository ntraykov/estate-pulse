import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './services/ads.service';
import { AdsQueries } from './queries/ads.queries';
import { AdsMustBeUniqueValidator } from './validators/ads-must-be-unique.validator';

@Module({
  controllers: [AdsController],
  providers: [AdsService, AdsQueries, AdsMustBeUniqueValidator],
})
export class AdsModule {}
