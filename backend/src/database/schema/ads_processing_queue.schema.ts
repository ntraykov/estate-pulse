import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const adsProcessingQueueSchema = mysqlTable('ads_processing_queue', {
  id: int('id').autoincrement().primaryKey(),
  url: varchar('url', { length: 500 }).unique().notNull(),
});
