import { longtext } from 'drizzle-orm/mysql-core';
import {
  bigint,
  boolean,
  decimal,
  index,
  int,
  json,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const ads = mysqlTable(
  'ads',
  {
    id: bigint('id', { mode: 'number', unsigned: true })
      .autoincrement()
      .primaryKey(),

    adId: varchar('ad_id', { length: 100 }).notNull(),

    url: varchar('url', { length: 500 }).notNull(),

    settlement: varchar('settlement', { length: 45 }).notNull(),

    adType: varchar('ad_type', { length: 30 }).notNull(),
    propertyType: varchar('property_type', { length: 30 }).notNull(),

    price: int('price', { unsigned: true }).notNull(),

    area: decimal('area', { precision: 10, scale: 2 }), // !!!

    rooms: int('rooms', { unsigned: true }),

    address: varchar('address', { length: 500 }),
    latitude: decimal('latitude', { precision: 10, scale: 7 }),
    longitude: decimal('longitude', { precision: 10, scale: 7 }),

    firstSeenAt: timestamp('first_seen_at').notNull().defaultNow(),
    lastSeenAt: timestamp('last_seen_at').notNull().defaultNow(),
    disappearedAt: timestamp('disappeared_at'),

    isActive: boolean('is_active').default(true),

    rawDetailsJson: json('raw_details_json'),
    rawScrapedJson: json('raw_scraped_json'),

    rawHtml: longtext('raw_html'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    adIdUnique: uniqueIndex('ads_ad_id_unique').on(table.adId),

    settlementIdx: index('ads_settlement_idx').on(table.settlement),

    adTypeIdx: index('ads_ad_type_idx').on(table.adType),
    propertyTypeIdx: index('ads_property_type_idx').on(table.propertyType),

    isActiveIdx: index('ads_is_active_idx').on(table.isActive),

    firstSeenAtIdx: index('ads_first_seen_at_idx').on(table.firstSeenAt),
    lastSeenAtIdx: index('ads_last_seen_at_idx').on(table.lastSeenAt),
    disappearedAtIdx: index('ads_disappeared_at_idx').on(table.disappearedAt),

    priceIdx: index('ads_price_idx').on(table.price),
    areaIdx: index('ads_area_idx').on(table.area),

    latitudeIdx: index('ads_latitude_idx').on(table.latitude),
    longitudeIdx: index('ads_longitude_idx').on(table.longitude),
  }),
);
