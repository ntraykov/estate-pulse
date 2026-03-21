import {
  mysqlTable,
  int,
  double,
  varchar,
  timestamp,
  text,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { settlements } from './settlements.schema';
import { AdvertiserType } from 'src/ads/enums/advertiser-type.enum';
import { OwnershipType } from 'src/ads/enums/ownership-type.enum';
import { mysqlEnum } from 'drizzle-orm/mysql-core';
import { AdType } from 'src/ads/enums/ad-type.enum';

export const ads = mysqlTable('ads', {
  id: int('id').autoincrement().primaryKey(),
  settlementId: int('settlement_id')
    .notNull()
    .references(() => settlements.id, { onDelete: 'cascade' }),
  adId: int('ad_id').unique().notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  type: mysqlEnum('type', [AdType.SALE, AdType.RENT]).notNull(),
  advertiserType: mysqlEnum('advertiser_type', [
    AdvertiserType.PRIVATE,
    AdvertiserType.AGENCY,
  ]).notNull(),
  ownershipType: mysqlEnum('ownership_type', [
    OwnershipType.FULL,
    OwnershipType.JOINT,
  ]),
  area: double('area').notNull(),
  price: double('price').notNull(),
  rooms: int('rooms').notNull(),
  floor: varchar('floor', { length: 10 }).notNull(),
  czynsz: int('czynsz'),
  address: varchar('address', { length: 255 }),
  description: text('description'),
  dateClosed: timestamp('date_closed'),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
