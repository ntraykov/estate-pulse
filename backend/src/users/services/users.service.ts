import { Inject, Injectable } from '@nestjs/common';
import { UsersQuery } from '../queries/users.query';
import { CreateUserDto } from '../dto/create-user.dto';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';

@Injectable()
export class UsersService {
  constructor(@Inject(UsersQuery) private readonly usersQuery: UsersQuery) {}

  async findAll() {
    return this.usersQuery.findAll();
  }

  async findById(id: number) {
    return await this.usersQuery.findById(id);
  }

  async create(dto: CreateUserDto): Promise<MySqlRawQueryResult> {
    return await this.usersQuery.create(dto);
  }
}
