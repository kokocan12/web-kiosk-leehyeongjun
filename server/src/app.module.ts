import {
  Injectable,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { FoodModule } from './food/food.module';
import { OptionsModule } from './options/options.module';
import { OrderModule } from './order/order.module';
import { NextFunction } from 'express';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    await new Promise((res) => {
      setTimeout(() => {
        res(1);
      }, 800);
    });
    next();
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    CategoriesModule,
    FoodModule,
    OptionsModule,
    OrderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DelayMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
