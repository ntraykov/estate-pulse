import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AdsService } from './services/ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { ScrapedAdDto } from './dto/scraped-ad.dto';
import { CreateAdProcessingQueueRecordDto } from './dto/create-ad-processing-queue-record.dto';
import { DrizzleQueryError } from 'drizzle-orm';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async createAd(@Body() dto: CreateAdDto): Promise<MySqlRawQueryResult> {
    return await this.adsService.createAd(dto);
  }

  @Get('scrape')
  async scrapeAdUrl(@Query('url') url: string): Promise<ScrapedAdDto> {
    return await this.adsService.scrapeAdUrl(url);
  }

  @Post('enqueue')
  async enqueueAdUrl(
    @Body() dto: CreateAdProcessingQueueRecordDto,
  ): Promise<boolean> {
    return await this.adsService.enqueueAdUrl(dto);
  }
}
