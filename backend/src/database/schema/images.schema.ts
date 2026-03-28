import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const images = mysqlTable('images', {
  id: int('id').autoincrement().primaryKey(),
  adsId: int('ads_id').notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  position: int('position').notNull().default(0),
});
