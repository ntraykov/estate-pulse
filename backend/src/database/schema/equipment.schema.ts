import { mysqlTable, int, boolean } from 'drizzle-orm/mysql-core';

export const equipmentDetails = mysqlTable('equipment_details', {
  id: int('id').autoincrement().primaryKey(),
  adsId: int('ads_id').notNull(),
  hasFurniture: boolean('has_furniture').notNull().default(false),
});
