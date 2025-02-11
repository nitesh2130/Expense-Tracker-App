import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './database.module';
import { DatabaseService } from './database.servise';
// import { UsersModule } from './users/users.module';
import { ExpenseUsersModule } from './expense-users/expense-users.module';
import { AuthModule } from './users/auth.module';

@Module({
  // imports: [DataBaseModule, UsersModule, ExpenseUsersModule, AuthModule],
  imports: [DataBaseModule, ExpenseUsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
