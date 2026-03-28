import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './services/ads.service';
import { AdsQueries } from './queries/ads.queries';
import { AdsProcessingQueueUrlMustBeUniqueValidator } from './validators/ads-processing-queue-url-must-be-unique.validator';
import { AdsProcessingQueueQueries } from './queries/ads-processing-queue.queries';
import { AdsProcessorService } from './services/ads-processor.service';
import { ProcessAdsCommand } from './cli/commands/process-ads.command';
import { AdScraperService } from './services/ad-scraper.service';

@Module({
  imports: [],
  controllers: [AdsController],
  providers: [
    AdsService,
    AdsProcessorService,
    AdsQueries,
    AdsProcessingQueueQueries,
    AdsProcessingQueueUrlMustBeUniqueValidator,
    ProcessAdsCommand,
    AdScraperService,
  ],
})
export class AdsModule {}
