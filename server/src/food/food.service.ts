import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { SelectFoodInterface } from './interfaces/food.interface';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private categoryRepository: Repository<Food>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  async findFoodsByCategory(category?: number): Promise<SelectFoodInterface[]> {
    const connection = this.categoryRepository.manager.connection;
    const qr = connection.createQueryRunner();

    qr.startTransaction();
    const builder = qr.manager.createQueryBuilder();

    builder.from(Food, 'food').leftJoin('food.category', 'category');

    if (category) builder.where('food.category = :category', { category });

    const foods = await builder
      .select([
        'food.id as id',
        'food.name as name',
        'base_price as basePrice',
        'category.id as categoryId',
        'img_url as imgUrl',
      ])
      .getRawMany();

    foods.forEach((food) => {
      food.basePrice = +food.basePrice;
      food.start = false;
    });

    qr.release();

    return foods;
  }
}
