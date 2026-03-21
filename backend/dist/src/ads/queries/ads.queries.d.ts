import { MySql2Database, MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { CreateAdDto } from '../dto/create-ad.dto';
export declare class AdsQueries {
    private readonly db;
    constructor(db: MySql2Database);
    createAd(dto: CreateAdDto): Promise<MySqlRawQueryResult>;
    findByAdId(adId: number): Promise<boolean>;
}
