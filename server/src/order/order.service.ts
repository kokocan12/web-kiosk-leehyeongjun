import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getTodayMax, getTodayMin } from 'src/utils/date';
import { Between, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderHistory } from './entities/order-history.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderHistory)
    private readonly orderHistoryRepo: Repository<OrderHistory>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}
  async createOrder(order: CreateOrderDto) {
    const lastOrderHistoryAtYesterday = await this.orderHistoryRepo.find({
      where: {
        created_at: Between(getTodayMin(), getTodayMax()),
      },
      order: { id: 'desc' },
    });

    const orderNum = lastOrderHistoryAtYesterday[0]
      ? lastOrderHistoryAtYesterday[0].order_num + 1
      : 1;

    const orderHistory = new OrderHistory();
    const orders: Order[] = [];

    let totalPrice = order.foods.reduce((acc, curr) => {
      const order = new Order();
      order.each_price = curr.eachPrice;
      order.food_id = curr.id;
      order.unit = curr.unit;
      order.size = curr.options.size;
      order.temperature = curr.options.temperature;
      order.order_history_id = orderHistory.id;
      order.food_name = curr.name;

      orders.push(order);

      return acc + curr.unit * curr.eachPrice;
    }, 0);

    orderHistory.order_num = orderNum;
    orderHistory.total_price = totalPrice;
    orderHistory.payment = order.payment.toUpperCase();

    await orderHistory.save();

    orders.forEach((order) => {
      order.order_history_id = orderHistory.id;
      order.save();
    });

    return { orderHistory, orders };
  }

  async getOrderDetail(orderId: number) {
    const orderHistoryPromise = this.orderHistoryRepo.findOne({
      where: { id: orderId },
    });
    const builder = this.orderHistoryRepo.manager.createQueryBuilder();
    const historyPromise = builder
      .from(Order, 'order')
      .where('order.order_history_id = :orderId', { orderId })
      .getRawMany();

    const [orderHistory, orders] = await Promise.all([
      orderHistoryPromise,
      historyPromise,
    ]);

    return { orderHistory, orders };
  }
}
