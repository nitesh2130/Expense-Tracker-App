import { Module } from '@nestjs/common';
import { ExpenseUsersService } from './expense-users.service';
import { ExpenseUsersController } from './expense-users.controller';

@Module({
  providers: [ExpenseUsersService],
  controllers: [ExpenseUsersController]
})
export class ExpenseUsersModule {}
