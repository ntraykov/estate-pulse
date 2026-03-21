"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const ads_schema_1 = require("./ads.schema");
exports.images = (0, mysql_core_1.mysqlTable)('images', {
    id: (0, mysql_core_1.int)('id').autoincrement().primaryKey(),
    adsId: (0, mysql_core_1.int)('ads_id')
        .notNull()
        .references(() => ads_schema_1.ads.id, { onDelete: 'cascade' }),
    url: (0, mysql_core_1.varchar)('url', { length: 255 }).notNull(),
    position: (0, mysql_core_1.int)('position').notNull().default(0),
});
//# sourceMappingURL=images.schema.js.map