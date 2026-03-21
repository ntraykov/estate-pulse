import { CreateAdDto } from '../dto/create-ad.dto';
import { AdsQueries } from '../queries/ads.queries';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
export declare class AdsService {
    private readonly adsQueries;
    constructor(adsQueries: AdsQueries);
    createAd(dto: CreateAdDto): Promise<MySqlRawQueryResult>;
    findByAdId(adId: number): Promise<boolean>;
}
