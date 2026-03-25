import { MySql2Database, MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/database/database.module';
import { CreateAdDto } from '../dto/create-ad.dto';
import { ads as adsSchema } from 'src/database/schema/ads.schema';
import { eq } from 'drizzle-orm';
import { CreateAdProcessingQueueRecordDto } from '../dto/create-ad-processing-queue-record.dto';
import { adsProcessingQueueSchema } from 'src/database/schema/ads_processing_queue.schema';
import { ResultSetHeader } from 'mysql2';

@Injectable()
export class AdsQueries {
  constructor(@Inject(DRIZZLE) private readonly db: MySql2Database) {}

  async createAd(dto: CreateAdDto): Promise<MySqlRawQueryResult> {
    return await this.db.insert(adsSchema).values(dto);
  }

  async findByAdId(adId: number): Promise<boolean> {
    const exists = await this.db
      .select({ adsId: adsSchema.adId })
      .from(adsSchema)
      .where(eq(adsSchema.adId, adId))
      .limit(1);

    return !!exists[0];
  }

  async findByAdProcessingQueueUrl(url: string): Promise<boolean> {
    const exists = await this.db
      .select({ adsId: adsProcessingQueueSchema.url })
      .from(adsProcessingQueueSchema)
      .where(eq(adsProcessingQueueSchema.url, url))
      .limit(1);

    return !!exists[0];
  }

  async enqueueAdUrl(dto: CreateAdProcessingQueueRecordDto): Promise<boolean> {
    const result = await this.db.insert(adsProcessingQueueSchema).values(dto);

    return result.length > 0 && result[0].affectedRows > 0;
  }
}
