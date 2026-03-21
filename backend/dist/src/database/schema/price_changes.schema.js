"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceChanges = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
const ads_schema_1 = require("./ads.schema");
exports.priceChanges = (0, mysql_core_1.mysqlTable)('price_changes', {
    id: (0, mysql_core_1.int)('id').autoincrement().primaryKey(),
    adsId: (0, mysql_core_1.int)('ads_id')
        .notNull()
        .references(() => ads_schema_1.ads.id, { onDelete: 'cascade' }),
    price: (0, mysql_core_1.double)('price').notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at')
        .default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
        .notNull(),
});
//# sourceMappingURL=price_changes.schema.js.map