import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { User } from './users/user.model';
import { Expense } from './expense-users/expense.model';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'expense_password',
      database: 'expense_db',
      models: [Expense, User],
      autoLoadModels: true,
      synchronize: false,
    }),
    // SequelizeModule.forFeature([User, Expense]),
  ],
})
export class DataBaseModule {}
