import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryInterface } from './interfaces/category.inteface';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getCategories(): Promise<CategoryInterface>;
}
