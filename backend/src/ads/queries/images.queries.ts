import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { DRIZZLE } from 'src/database/database.module';
import { images as imagesSchema } from 'src/database/schema/images.schema';

export type ImageRowInsert = {
  adsId: number;
  url: string;
  position: number;
};

@Injectable()
export class ImagesQueries {
  constructor(@Inject(DRIZZLE) private readonly db: MySql2Database) {}

  async insertMany(rows: ImageRowInsert[]): Promise<void> {
    if (rows.length === 0) {
      return;
    }
    await this.db.insert(imagesSchema).values(
      rows.map((r) => ({
        adsId: r.adsId,
        url: r.url,
        position: r.position,
      })),
    );
  }
}
