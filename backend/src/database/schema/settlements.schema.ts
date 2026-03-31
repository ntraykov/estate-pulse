import { index } from 'drizzle-orm/mysql-core';
import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const settlements = mysqlTable(
  'settlements',
  {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 45 }).notNull(),
  },
  (table) => [index('settlements_name_idx').on(table.name)],
);
