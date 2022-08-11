import { Order } from 'src/order/entities/order.entity';
import { BaseEntity } from 'typeorm';
export declare class OrderHistory extends BaseEntity {
    id: number;
    order_num: number;
    total_price: number;
    created_at: Date;
    payment: string;
    cancel: number;
    orders: Order[];
}
