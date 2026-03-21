"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingDetails = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const ads_schema_1 = require("./ads.schema");
exports.buildingDetails = (0, mysql_core_1.mysqlTable)('building_details', {
    id: (0, mysql_core_1.int)('id').autoincrement().primaryKey(),
    adsId: (0, mysql_core_1.int)('ads_id')
        .notNull()
        .references(() => ads_schema_1.ads.id, { onDelete: 'cascade' }),
    constructionYear: (0, mysql_core_1.int)('construction_year'),
    elevator: (0, mysql_core_1.boolean)('elevator'),
    buildingType: (0, mysql_core_1.varchar)('building_type', ['block', 'kamenica']),
    buildingMaterial: (0, mysql_core_1.varchar)('building_material', ['brick', 'panel']),
});
//# sourceMappingURL=building_details.schema.js.map