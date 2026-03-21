import { AdsService } from './services/ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
export declare class AdsController {
    private readonly adsService;
    constructor(adsService: AdsService);
    createAd(dto: CreateAdDto): Promise<MySqlRawQueryResult>;
}
