import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { QueueItemDto } from '../dto/queue-item.dto';
import { CreateQueueItemDto } from '../dto/create-queue-item.dto';
import { AdsQueueService } from '../services/ads-queue.service';
import { AdsProcessorService } from '../services/ads-processor.service';
import { ProcessedQueueItemDto } from '../dto/processed-queue-item.dto';

@Controller('ads/queue')
export class AdsQueueController {
  constructor(
    private readonly adsQueueService: AdsQueueService,
    private readonly adsProcessor: AdsProcessorService,
  ) {}

  @Get()
  async all(): Promise<QueueItemDto[]> {
    return await this.adsQueueService.all();
  }

  @Post()
  async create(@Body() dto: CreateQueueItemDto): Promise<QueueItemDto> {
    return await this.adsQueueService.create(dto);
  }

  @Post(':id')
  async process(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProcessedQueueItemDto | null> {
    return await this.adsProcessor.process(id);
  }
}
