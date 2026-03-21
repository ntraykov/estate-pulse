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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdDto = void 0;
const class_validator_1 = require("class-validator");
const ownership_type_enum_1 = require("../enums/ownership-type.enum");
const advertiser_type_enum_1 = require("../enums/advertiser-type.enum");
const ad_type_enum_1 = require("../enums/ad-type.enum");
const ads_must_be_unique_validator_1 = require("../validators/ads-must-be-unique.validator");
class CreateAdDto {
    settlementId;
    adId;
    url;
    type;
    advertiserType;
    ownershipType;
    area;
    price;
    rooms;
    floor;
    czynsz;
    address;
    description;
}
exports.CreateAdDto = CreateAdDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAdDto.prototype, "settlementId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(ads_must_be_unique_validator_1.AdsMustBeUniqueValidator),
    __metadata("design:type", Number)
], CreateAdDto.prototype, "adId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([ad_type_enum_1.AdType.SALE, ad_type_enum_1.AdType.RENT]),
    __metadata("design:type", String)
], CreateAdDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([advertiser_type_enum_1.AdvertiserType.PRIVATE, advertiser_type_enum_1.AdvertiserType.AGENCY]),
    __metadata("design:type", String)
], CreateAdDto.prototype, "advertiserType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([ownership_type_enum_1.OwnershipType.FULL, ownership_type_enum_1.OwnershipType.JOINT]),
    __metadata("design:type", String)
], CreateAdDto.prototype, "ownershipType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAdDto.prototype, "area", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAdDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAdDto.prototype, "rooms", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdDto.prototype, "floor", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAdDto.prototype, "czynsz", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdDto.prototype, "description", void 0);
//# sourceMappingURL=create-ad.dto.js.map