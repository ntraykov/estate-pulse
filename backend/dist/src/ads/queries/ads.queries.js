"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsQueries = void 0;
const mysql2_1 = require("drizzle-orm/mysql2");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const ads_schema_1 = require("../../database/schema/ads.schema");
const drizzle_orm_1 = require("drizzle-orm");
let AdsQueries = class AdsQueries {
    db;
    constructor(db) {
        this.db = db;
    }
    async createAd(dto) {
        return await this.db.insert(ads_schema_1.ads).values(dto);
    }
    async findByAdId(adId) {
        const exists = await this.db
            .select({ adsId: ads_schema_1.ads.adId })
            .from(ads_schema_1.ads)
            .where((0, drizzle_orm_1.eq)(ads_schema_1.ads.adId, adId))
            .limit(1);
        return !!exists[0];
    }
};
exports.AdsQueries = AdsQueries;
exports.AdsQueries = AdsQueries = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DRIZZLE)),
    __metadata("design:paramtypes", [mysql2_1.MySql2Database])
], AdsQueries);
//# sourceMappingURL=ads.queries.js.map