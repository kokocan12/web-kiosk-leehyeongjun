import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    const categories = await this.categoryRepository.find();

    const categoriesJson = {
      categories: categories.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      }),
    };

    return categoriesJson;
  }
}
