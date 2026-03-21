"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ads = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
const settlements_schema_1 = require("./settlements.schema");
const advertiser_type_enum_1 = require("../../ads/enums/advertiser-type.enum");
const ownership_type_enum_1 = require("../../ads/enums/ownership-type.enum");
const mysql_core_2 = require("drizzle-orm/mysql-core");
const ad_type_enum_1 = require("../../ads/enums/ad-type.enum");
exports.ads = (0, mysql_core_1.mysqlTable)('ads', {
    id: (0, mysql_core_1.int)('id').autoincrement().primaryKey(),
    settlementId: (0, mysql_core_1.int)('settlement_id')
        .notNull()
        .references(() => settlements_schema_1.settlements.id, { onDelete: 'cascade' }),
    adId: (0, mysql_core_1.int)('ad_id').unique().notNull(),
    url: (0, mysql_core_1.varchar)('url', { length: 255 }).notNull(),
    type: (0, mysql_core_2.mysqlEnum)('type', [ad_type_enum_1.AdType.SALE, ad_type_enum_1.AdType.RENT]).notNull(),
    advertiserType: (0, mysql_core_2.mysqlEnum)('advertiser_type', [
        advertiser_type_enum_1.AdvertiserType.PRIVATE,
        advertiser_type_enum_1.AdvertiserType.AGENCY,
    ]).notNull(),
    ownershipType: (0, mysql_core_2.mysqlEnum)('ownership_type', [
        ownership_type_enum_1.OwnershipType.FULL,
        ownership_type_enum_1.OwnershipType.JOINT,
    ]),
    area: (0, mysql_core_1.double)('area').notNull(),
    price: (0, mysql_core_1.double)('price').notNull(),
    rooms: (0, mysql_core_1.int)('rooms').notNull(),
    floor: (0, mysql_core_1.varchar)('floor', { length: 10 }).notNull(),
    czynsz: (0, mysql_core_1.int)('czynsz'),
    address: (0, mysql_core_1.varchar)('address', { length: 255 }),
    description: (0, mysql_core_1.text)('description'),
    dateClosed: (0, mysql_core_1.timestamp)('date_closed'),
    createdAt: (0, mysql_core_1.timestamp)('created_at')
        .default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at')
        .default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`)
        .notNull(),
});
//# sourceMappingURL=ads.schema.js.map