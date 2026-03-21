import { mysqlTable, int, double, timestamp } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { ads } from './ads.schema';

export const priceChanges = mysqlTable('price_changes', {
  id: int('id').autoincrement().primaryKey(),
  adsId: int('ads_id')
    .notNull()
    .references(() => ads.id, { onDelete: 'cascade' }),
  price: double('price').notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
