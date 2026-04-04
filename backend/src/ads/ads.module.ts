import { Module } from '@nestjs/common';
import { AdsController } from './controllers/ads.controller';
import { AdsQueries } from './queries/ads.queries';
import { AdsQueueUrlMustBeUniqueValidator } from './validators/ads-queue-url-must-be-unique.validator';
import { AdsQueueQueries } from './queries/ads-queue.queries';
import { ImagesQueries } from './queries/images.queries';
import { AdsProcessorService } from './services/ads-processor.service';
import { ProcessAdsCommand } from './cli/commands/process-ads.command';
import { AdScraperService } from './services/ad-scraper.service';
import { AdsService } from './services/ads.service';
import { AdsQueueController } from './controllers/ads-queue.controller';
import { AdsQueueService } from './services/ads-queue.service';

@Module({
  imports: [],
  controllers: [AdsController, AdsQueueController],
  providers: [
    AdsService,
    AdsQueueService,
    AdsProcessorService,
    AdsQueries,
    AdsQueueQueries,
    ImagesQueries,
    AdsQueueUrlMustBeUniqueValidator,
    ProcessAdsCommand,
    AdScraperService,
  ],
})
export class AdsModule {}
