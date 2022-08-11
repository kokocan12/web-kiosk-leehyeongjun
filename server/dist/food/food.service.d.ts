import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { SelectFoodInterface } from './interfaces/food.interface';
export declare class FoodService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Food>);
    findAll(): Promise<Food[]>;
    findFoodsByCategory(category?: number): Promise<SelectFoodInterface[]>;
}
