import { UsersQuery } from '../queries/users.query';
import { CreateUserDto } from '../dto/create-user.dto';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
export declare class UsersService {
    private readonly usersQuery;
    constructor(usersQuery: UsersQuery);
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
