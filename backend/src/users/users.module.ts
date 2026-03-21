import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersQuery } from './queries/users.query';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersQuery],
})
export class UsersModule {}
