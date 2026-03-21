import { mysqlTable, int, boolean } from 'drizzle-orm/mysql-core';
import { ads } from './ads.schema';

export const equipmentDetails = mysqlTable('equipment_details', {
  id: int('id').autoincrement().primaryKey(),
  adsId: int('ads_id')
    .notNull()
    .references(() => ads.id, { onDelete: 'cascade' }),
  hasFurniture: boolean('has_furniture').notNull().default(false),
});
