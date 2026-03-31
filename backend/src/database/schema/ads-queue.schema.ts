import { sql } from 'drizzle-orm';
import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const adsQueue = mysqlTable('ads_queue', {
  id: int('id').autoincrement().primaryKey(),
  url: varchar('url', { length: 500 }).unique().notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
