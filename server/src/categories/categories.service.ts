import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryInterface } from './interfaces/category.inteface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<CategoryInterface> {
    const categories = await this.categoryRepository.find();

    const categoriesJson: CategoryInterface = {
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
