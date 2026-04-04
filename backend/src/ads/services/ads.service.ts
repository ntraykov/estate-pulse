import { Injectable } from '@nestjs/common';
import { AdsQueries } from '../queries/ads.queries';
import { CreateAdDto } from '../dto/create-ad.dto';
import { QueueItemDto } from '../dto/queue-item.dto';
import { AdsListItemDto } from '../dto/ads-list-item.dto';
import { AdDto } from '../dto/ad.dto';

@Injectable()
export class AdsService {
  constructor(private readonly adsQueries: AdsQueries) {}

  async create(dto: CreateAdDto): Promise<number | null> {
    const createdAdId: number | null = await this.adsQueries.create(dto);
    return createdAdId || null;
  }

  async list(): Promise<AdsListItemDto[]> {
    return await this.adsQueries.list();
  }

  async get(id: number): Promise<AdDto | null> {
    return await this.adsQueries.findById(id);
  }
}
