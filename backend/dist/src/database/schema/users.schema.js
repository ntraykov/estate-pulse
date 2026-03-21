"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, mysql_core_1.mysqlTable)('users', {
    id: (0, mysql_core_1.int)('id').autoincrement().primaryKey(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at')
        .default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
        .notNull(),
});
//# sourceMappingURL=users.schema.js.map