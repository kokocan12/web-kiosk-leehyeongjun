import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        orderHistory: import("./entities/order-history.entity").OrderHistory;
        orders: import("./entities/order.entity").Order[];
    }>;
    getOderDetail(orderId: string): Promise<{
        orderHistory: import("./entities/order-history.entity").OrderHistory;
        orders: any[];
    }>;
}
