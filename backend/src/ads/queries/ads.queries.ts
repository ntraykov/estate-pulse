import { MySql2Database } from 'drizzle-orm/mysql2';
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/database/database.module';
import { CreateAdDto } from '../dto/create-ad.dto';
import { ads as adsSchema } from 'src/database/schema/ads.schema';
import { images as imagesSchema } from 'src/database/schema/images.schema';
import { AdsListItemDto } from '../dto/ads-list-item.dto';
import { desc, eq } from 'drizzle-orm';
import { AdDto } from '../dto/ad.dto';
import { ImageDto } from '../dto/image.dto';

@Injectable()
export class AdsQueries {
  constructor(@Inject(DRIZZLE) private readonly db: MySql2Database) {}

  async create(dto: CreateAdDto): Promise<number | null> {
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
      rawDetailsJson: dto.rawDetailsJson ?? {},
      rawScrapedJson: dto.rawScrapedJson ?? {},
      rawHtml: dto.rawHtml,
    });

    return result[0] ? result[0].insertId : null;
  }

  async list(): Promise<AdsListItemDto[]> {
    const result = await this.db
      .select()
      .from(adsSchema)
      .leftJoin(imagesSchema, eq(adsSchema.id, imagesSchema.adsId))
      .where(eq(imagesSchema.position, 0))
      .orderBy(desc(adsSchema.id))
      .limit(10);

    return result.map(
      (row) =>
        new AdsListItemDto(
          row.ads.id,
          row.ads.settlement,
          row.ads.address || '',
          row.ads.price,
          row.ads.area ? parseFloat(row.ads.area) : 0,
          row.ads.rooms,
          row.images?.url ?? '',
        ),
    );
  }

  async findById(id: number): Promise<AdDto | null> {
    const result = await this.db
      .select()
      .from(adsSchema)
      .leftJoin(imagesSchema, eq(adsSchema.id, imagesSchema.adsId))
      .where(eq(adsSchema.id, id));

    if (result.length === 0) {
      return null;
    }

    const ad = result[0].ads;

    const images = result
      .filter((row) => row.images !== null)
      .map((row) => {
        const image = row.images!;

        return new ImageDto(image.id, image.url, image.position);
      });

    return new AdDto(
      ad.id,
      ad.adId,
      ad.url,
      ad.settlement,
      ad.adType,
      ad.propertyType,
      ad.price,
      ad.area ? parseFloat(ad.area) : 0,
      ad.rooms ?? 0,
      ad.address || '',
      ad.latitude ? parseFloat(ad.latitude) : 0,
      ad.longitude ? parseFloat(ad.longitude) : 0,
      ad.firstSeenAt,
      images,
      ad.rawDetailsJson ?? {},
    );
  }
}
