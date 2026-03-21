import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }[]>;
    getUserById(id: string): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }>;
    createUser(dto: CreateUserDto): Promise<MySqlRawQueryResult>;
}
