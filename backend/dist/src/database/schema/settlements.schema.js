"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settlements = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.settlements = (0, mysql_core_1.mysqlTable)('settlements', {
    id: (0, mysql_core_1.int)('id').autoincrement().primaryKey(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at')
        .default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at')
        .default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
        .notNull(),
});
//# sourceMappingURL=settlements.schema.js.map