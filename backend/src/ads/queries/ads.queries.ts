import { MySql2Database } from 'drizzle-orm/mysql2';
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/database/database.module';
import { CreateAdDto } from '../dto/create-ad.dto';
import { ads as adsSchema } from 'src/database/schema/ads.schema';

@Injectable()
export class AdsQueries {
  constructor(@Inject(DRIZZLE) private readonly db: MySql2Database) {}

  async create(dto: CreateAdDto): Promise<boolean> {
    const result = await this.db.insert(adsSchema).values({
      adId: dto.adId,
      url: dto.url,
      settlement: dto.settlement,
      adType: dto.adType,
      propertyType: dto.propertyType,
      price: dto.price,
      area: dto.area !== undefined ? dto.area.toString() : undefined,
      rooms: dto.rooms,
      address: dto.address,
      latitude:
        dto.latitude !== undefined ? dto.latitude.toString() : undefined,
      longitude:
        dto.longitude !== undefined ? dto.longitude.toString() : undefined,
      rawDetailsJson: dto.rawDetailsJson,
      rawScrapedJson: dto.rawScrapedJson,
      rawHtml: dto.rawHtml,
    });

    return result[0].affectedRows > 0;
  }
}
