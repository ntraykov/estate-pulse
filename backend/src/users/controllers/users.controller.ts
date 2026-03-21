import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.findById(Number(id));
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<MySqlRawQueryResult> {
    return await this.usersService.create(dto);
  }
}
