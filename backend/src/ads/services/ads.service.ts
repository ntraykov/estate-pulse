import { CreateAdDto } from '../dto/create-ad.dto';
import { Injectable } from '@nestjs/common';
import { AdsQueries } from '../queries/ads.queries';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';

@Injectable()
export class AdsService {
  constructor(private readonly adsQueries: AdsQueries) {}

  async createAd(dto: CreateAdDto): Promise<MySqlRawQueryResult> {
    return await this.adsQueries.createAd(dto);
  }

  async findByAdId(adId: number): Promise<boolean> {
    return await this.adsQueries.findByAdId(adId);
  }
}
