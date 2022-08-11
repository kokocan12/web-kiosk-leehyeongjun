import { Category } from 'src/categories/entities/category.entity';
import { Size, Temperature } from 'src/options/entities/option.entity';
import { Order } from 'src/order/entities/order.entity';
export declare class Food {
    id: number;
    name: string;
    img_url: string;
    category: Category;
    base_price: number;
    orders: Order[];
    size: Size;
    temperature: Temperature;
}
