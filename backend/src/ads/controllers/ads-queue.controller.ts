import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueueItemDto } from '../dto/queue-item.dto';
import { CreateQueueItemDto } from '../dto/create-queue-item.dto';
import { AdsQueueService } from '../services/ads-queue.service';

@Controller('ads/queue')
export class AdsQueueController {
  constructor(private readonly adsQueueService: AdsQueueService) {}

  @Get()
  async all(): Promise<QueueItemDto[]> {
    return await this.adsQueueService.all();
  }

  @Post()
  async create(@Body() dto: CreateQueueItemDto): Promise<QueueItemDto> {
    return await this.adsQueueService.create(dto);
  }
}
