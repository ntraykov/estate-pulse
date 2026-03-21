"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const cheerio = __importStar(require("cheerio"));
const fs_1 = require("fs");
let AppService = class AppService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getHello() {
        const filePath = '/home/ntraykov/Desktop/Presentation/3 pokoje, mieszkanie na sprzedaż - Lubin, lubiński, dolnośląskie - 67777651 • www.otodom.pl.html';
        const html = await fs_1.promises.readFile(filePath, 'utf8');
        const $ = cheerio.load(html);
        const price = $('[aria-label="Cena"]');
        const address = $('[data-sentry-source-file="MapLink.tsx"]').first().text();
        console.log('Address: ', address);
        console.log('Price: ', price.text());
        const adHistory = $('[data-sentry-component="AdHistoryBase"]').find('tbody tr');
        for (let i = 0; i < adHistory.length; i++) {
            const row = $(adHistory).eq(i);
            console.log(row.find('td').eq(1).text(), row.find('td').eq(0).text(), row.find('td').eq(2).text());
        }
        const details = $('[data-sentry-element="ItemGridContainer"]');
        for (let i = 0; i < details.length; i++) {
            const children = $(details[i]).children();
            console.log(children.first().text(), children.last().text());
        }
        return '';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
//# sourceMappingURL=app.service.js.map