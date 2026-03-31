import { Injectable } from '@nestjs/common';
import { AdsQueries } from '../queries/ads.queries';
import { CreateAdDto } from '../dto/create-ad.dto';

@Injectable()
export class AdsService {
  constructor(private readonly adsQueries: AdsQueries) {}

  async create(dto: CreateAdDto): Promise<boolean> {
    return await this.adsQueries.create(dto);
  }
}
