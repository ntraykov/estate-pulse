import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const settlements = mysqlTable('settlements', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});
