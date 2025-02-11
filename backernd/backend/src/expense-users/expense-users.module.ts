import { Module } from '@nestjs/common';
import { ExpenseUsersService } from './expense-users.service';
import { ExpenseUsersController } from './expense-users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expense } from './expense.model';

@Module({
  imports: [SequelizeModule.forFeature([Expense])],
  providers: [ExpenseUsersService],
  controllers: [ExpenseUsersController],
})
export class ExpenseUsersModule {}
