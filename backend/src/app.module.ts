import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { configProvider, MongooseConfigService } from './app.config.provider';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './repository/films.schema';
import { FilmsController } from './films/films.controller';
import { FilmsRepository } from './repository/films.repository';
import { FilmsService } from './films/films.service';
import { OrdersRepository } from './repository/orders.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: Film.name,
        schema: FilmSchema,
      },
    ]),
  ],
  controllers: [OrderController, FilmsController],
  providers: [configProvider, OrdersRepository ,OrderService, FilmsRepository, FilmsService],
})
export class AppModule {}
