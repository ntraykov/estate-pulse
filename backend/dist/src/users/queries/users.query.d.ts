import { MySql2Database, MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UsersQuery {
    private readonly db;
    constructor(db: MySql2Database);
    findAll(): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }[]>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }>;
    create(dto: CreateUserDto): Promise<MySqlRawQueryResult>;
}
