import { Body, Controller, Post } from '@nestjs/common';
import { AdsService } from './services/ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  async createAd(@Body() dto: CreateAdDto): Promise<MySqlRawQueryResult> {
    return await this.adsService.createAd(dto);
  }
}
