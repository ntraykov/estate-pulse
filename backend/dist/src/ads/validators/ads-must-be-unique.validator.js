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
exports.AdsMustBeUniqueValidator = void 0;
const class_validator_1 = require("class-validator");
const ads_service_1 = require("../services/ads.service");
const common_1 = require("@nestjs/common");
let AdsMustBeUniqueValidator = class AdsMustBeUniqueValidator {
    adsService;
    constructor(adsService) {
        this.adsService = adsService;
    }
    async validate(value, args) {
        const exists = await this.adsService.findByAdId(value);
        return !exists;
    }
    defaultMessage(validationArguments) {
        return 'Ad ID must be unique';
    }
};
exports.AdsMustBeUniqueValidator = AdsMustBeUniqueValidator;
exports.AdsMustBeUniqueValidator = AdsMustBeUniqueValidator = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'AdsMustBeUniqueValidator', async: true }),
    __metadata("design:paramtypes", [ads_service_1.AdsService])
], AdsMustBeUniqueValidator);
//# sourceMappingURL=ads-must-be-unique.validator.js.map