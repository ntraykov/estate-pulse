"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipmentDetails = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const ads_schema_1 = require("./ads.schema");
exports.equipmentDetails = (0, mysql_core_1.mysqlTable)('equipment_details', {
    id: (0, mysql_core_1.int)('id').autoincrement().primaryKey(),
    adsId: (0, mysql_core_1.int)('ads_id')
        .notNull()
        .references(() => ads_schema_1.ads.id, { onDelete: 'cascade' }),
    hasFurniture: (0, mysql_core_1.boolean)('has_furniture').notNull().default(false),
});
//# sourceMappingURL=equipment.schema.js.map