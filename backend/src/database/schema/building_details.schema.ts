import { mysqlTable, int, varchar, boolean } from 'drizzle-orm/mysql-core';
import { ads } from './ads.schema';

export const buildingDetails = mysqlTable('building_details', {
  id: int('id').autoincrement().primaryKey(),
  adsId: int('ads_id')
    .notNull()
    .references(() => ads.id, { onDelete: 'cascade' }),
  constructionYear: int('construction_year'),
  elevator: boolean('elevator'),
  buildingType: varchar('building_type', ['block', 'kamenica']),
  buildingMaterial: varchar('building_material', ['brick', 'panel']),
});
