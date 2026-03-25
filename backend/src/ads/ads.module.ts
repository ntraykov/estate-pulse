import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdsController } from './ads.controller';
import { AdsService } from './services/ads.service';
import { AdsQueries } from './queries/ads.queries';
import { AdsMustBeUniqueValidator } from './validators/ads-must-be-unique.validator';
import { AdsProcessingQueueUrlMustBeUniqueValidator } from './validators/ads-processing-queue-url-must-be-unique.validator';

@Module({
  imports: [HttpModule],
  controllers: [AdsController],
  providers: [
    AdsService,
    AdsQueries,
    AdsMustBeUniqueValidator,
    AdsProcessingQueueUrlMustBeUniqueValidator,
  ],
})
export class AdsModule {}
