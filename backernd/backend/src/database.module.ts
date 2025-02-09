import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { User } from './users/user.model';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'expense_password',
      database: 'expense_db',
      models: [User],
      // autoLoadModels: true,
      // synchronize: true,
    }),
  ],
})
export class DataBaseModule {}
