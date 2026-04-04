import { Injectable } from '@nestjs/common';
import { AdsQueries } from '../queries/ads.queries';
import { CreateAdDto } from '../dto/create-ad.dto';
import { QueueItemDto } from '../dto/queue-item.dto';

@Injectable()
export class AdsService {
  constructor(private readonly adsQueries: AdsQueries) {}

  async create(dto: CreateAdDto): Promise<number | null> {
    const createdAdId: number | null = await this.adsQueries.create(dto);
    return createdAdId || null;
  }
}
