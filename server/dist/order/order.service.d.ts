import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderHistory } from './entities/order-history.entity';
import { Order } from './entities/order.entity';
export declare class OrderService {
    private readonly orderHistoryRepo;
    private readonly orderRepo;
    constructor(orderHistoryRepo: Repository<OrderHistory>, orderRepo: Repository<Order>);
    createOrder(order: CreateOrderDto): Promise<{
        orderHistory: OrderHistory;
        orders: Order[];
    }>;
    getOrderDetail(orderId: number): Promise<{
        orderHistory: OrderHistory;
        orders: any[];
    }>;
}
