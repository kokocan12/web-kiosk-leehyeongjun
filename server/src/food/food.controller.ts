import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('api/foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  getFoodList(@Query('category-id') category?: number) {
    return this.foodService.findFoodsByCategory(category);
  }
}
