import { BaseEntity } from 'typeorm';
export declare class Order extends BaseEntity {
    id: number;
    order_history_id: number;
    food_name: string;
    food_id: number;
    unit: number;
    each_price: number;
    size: string;
    temperature: string;
    created_at: Date;
}
