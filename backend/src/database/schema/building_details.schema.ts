import { mysqlTable, int, varchar, boolean } from 'drizzle-orm/mysql-core';

export const buildingDetails = mysqlTable('building_details', {
  id: int('id').autoincrement().primaryKey(),
  adsId: int('ads_id').notNull(),
  constructionYear: int('construction_year'),
  elevator: boolean('elevator').default(false),
  buildingType: varchar('building_type', { length: 20 }),
  buildingMaterial: varchar('building_material', { length: 20 }),
});
