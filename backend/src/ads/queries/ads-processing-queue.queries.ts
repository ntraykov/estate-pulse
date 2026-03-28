import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { DRIZZLE } from 'src/database/database.module';
import { adsProcessingQueue } from 'src/database/schema/ads-processing-queue.schema';
import { CreateAdProcessingQueueRecordDto } from '../dto/create-ad-processing-queue-record.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class AdsProcessingQueueQueries {
  constructor(@Inject(DRIZZLE) private readonly db: MySql2Database) {}

  async enqueueAdUrl(dto: CreateAdProcessingQueueRecordDto): Promise<boolean> {
    const result = await this.db.insert(adsProcessingQueue).values(dto);

    return result[0].affectedRows > 0;
  }

  async findByAdProcessingQueueUrl(url: string): Promise<boolean> {
    const result = await this.db
      .select()
      .from(adsProcessingQueue)
      .where(eq(adsProcessingQueue.url, url))
      .limit(1);

    return !!result[0];
  }

  async all(): Promise<(typeof adsProcessingQueue.$inferSelect)[]> {
    return await this.db.select().from(adsProcessingQueue);
  }
}
