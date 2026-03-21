import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database, MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { DRIZZLE } from '../../database/database.module';
import { users } from '../../database/schema/users.schema';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersQuery {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: MySql2Database,
  ) {}

  async findAll() {
    return await this.db.select().from(users);
  }

  async findById(id: number) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async create(dto: CreateUserDto): Promise<MySqlRawQueryResult> {
    const result = await this.db.insert(users).values({
      email: dto.email,
      name: dto.name,
    });

    return result;
  }
}
