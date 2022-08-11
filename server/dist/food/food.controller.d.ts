import { FoodService } from './food.service';
export declare class FoodController {
    private readonly foodService;
    constructor(foodService: FoodService);
    getFoodList(category?: number): Promise<import("./interfaces/food.interface").SelectFoodInterface[]>;
}
