import { mysqlTable, int, double, timestamp } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const priceChanges = mysqlTable('price_changes', {
  id: int('id').autoincrement().primaryKey(),
  adsId: int('ads_id').notNull(),
  price: double('price').notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
