import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseRepository } from './database.repository';
import { Films } from 'src/films/entities/film.entity';
import { Schedules } from 'src/films/entities/schedule.entity';
import { OrderController } from 'src/order/order.controller';
import { FilmsController } from 'src/films/films.controller';
import { OrdersRepository } from 'src/repository/orders.repository';
import { OrderService } from 'src/order/order.service';
import { FilmsRepository } from 'src/repository/films.repository';
import { FilmsService } from 'src/films/films.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Films, Schedules]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.url'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        entities: [Films, Schedules],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [OrderController, FilmsController],
  providers: [
    DatabaseRepository,
    OrdersRepository,
    OrderService,
    FilmsRepository,
    FilmsService,
  ],
})
export class DatabaseModule {}
