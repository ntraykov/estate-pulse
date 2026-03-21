"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = exports.DRIZZLE = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const promise_1 = __importDefault(require("mysql2/promise"));
const mysql2_1 = require("drizzle-orm/mysql2");
exports.DRIZZLE = Symbol('DRIZZLE');
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: exports.DRIZZLE,
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const connectionString = configService.get('DATABASE_URL');
                    if (!connectionString) {
                        throw new Error('DATABASE_URL is missing');
                    }
                    const pool = promise_1.default.createPool({
                        uri: connectionString,
                        connectionLimit: 10,
                    });
                    return (0, mysql2_1.drizzle)(pool);
                },
            },
        ],
        exports: [exports.DRIZZLE],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map