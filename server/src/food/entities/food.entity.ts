import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FOOD_TB')
export class Food {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'char', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  img_url: string;

  @ManyToOne(() => Category, (category) => category.id)
  category_id: number;

  @Column({ type: 'decimal' })
  base_price: number;
}
