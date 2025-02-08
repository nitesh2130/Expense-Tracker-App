import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pizza_password',
      database: 'pizza_db',
      models: [],
      // autoLoadModels: false,
      // models: [User],
      // synchronize: true,
    }),
  ],
})
export class DataBaseModule {}
