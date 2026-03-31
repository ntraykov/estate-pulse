import { Injectable } from '@nestjs/common';
import { QueueItemDto } from '../dto/queue-item.dto';
import { CreateQueueItemDto } from '../dto/create-queue-item.dto';
import { AdsQueueQueries } from '../queries/ads-queue.queries';

@Injectable()
export class AdsQueueService {
  constructor(private readonly adsQueueQueries: AdsQueueQueries) {}

  async findByUrl(url: string): Promise<boolean> {
    return await this.adsQueueQueries.findByUrl(url);
  }

  async all(): Promise<QueueItemDto[]> {
    return await this.adsQueueQueries.all();
  }

  async create(dto: CreateQueueItemDto): Promise<QueueItemDto> {
    return await this.adsQueueQueries.create(dto);
  }
}
