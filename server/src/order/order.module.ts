import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderHistory } from './entities/order-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderHistory])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
