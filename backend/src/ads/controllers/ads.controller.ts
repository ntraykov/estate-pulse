import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AdsListItemDto } from '../dto/ads-list-item.dto';
import { AdsService } from '../services/ads.service';
import { AdDto } from '../dto/ad.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  async list(): Promise<AdsListItemDto[]> {
    return this.adsService.list();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<AdDto | null> {
    return this.adsService.get(id);
  }
}
