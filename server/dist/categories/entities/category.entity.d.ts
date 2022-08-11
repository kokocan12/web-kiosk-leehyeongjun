import { Food } from 'src/food/entities/food.entity';
export declare class Category {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    foods: Food[];
}
