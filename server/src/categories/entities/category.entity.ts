import { Food } from 'src/food/entities/food.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('CATEGORY_TB')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 10, type: 'char' })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Food, (food) => food.category)
  foods: Food[];
}
