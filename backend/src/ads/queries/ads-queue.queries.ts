import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { DRIZZLE } from 'src/database/database.module';
import { adsQueue } from 'src/database/schema/ads-queue.schema';
import { QueueItemDto } from '../dto/queue-item.dto';
import { CreateQueueItemDto } from '../dto/create-queue-item.dto';
import { desc, eq } from 'drizzle-orm';

@Injectable()
export class AdsQueueQueries {
  constructor(@Inject(DRIZZLE) private readonly db: MySql2Database) {}

  async all(): Promise<QueueItemDto[]> {
    const result = await this.db.select().from(adsQueue);
    return result.map(
      (item) => new QueueItemDto(item.id, item.url, item.createdAt),
    );
  }

  async create(dto: CreateQueueItemDto): Promise<QueueItemDto> {
    const result = await this.db.insert(adsQueue).values(dto);

    if (result[0].affectedRows === 0) {
      throw new Error('Failed to create ad queue item');
    }

    return await this.db
      .select()
      .from(adsQueue)
      .where(eq(adsQueue.id, result[0].insertId))
      .orderBy(desc(adsQueue.id))
      .limit(1)
      .then(([item]) => new QueueItemDto(item.id, item.url, item.createdAt));
  }

  async findByUrl(url: string): Promise<boolean> {
    const result = await this.db
      .select()
      .from(adsQueue)
      .where(eq(adsQueue.url, url))
      .limit(1);

    return !!result[0];
  }

  async next(): Promise<QueueItemDto | null> {
    const result = await this.db.select().from(adsQueue).limit(1);

    return result[0]
      ? new QueueItemDto(result[0].id, result[0].url, result[0].createdAt)
      : null;
  }
}
