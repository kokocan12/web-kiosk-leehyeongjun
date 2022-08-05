import { Category } from 'src/categories/entities/category.entity';
import { Size, Temperature } from 'src/options/entities/option.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('FOOD_TB')
export class Food {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'char', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  img_url: string;

  @JoinColumn({ name: 'category' })
  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @Column({ type: 'decimal' })
  base_price: number;

  @OneToMany(() => Order, (order) => order.food_id)
  orders: Order[];

  @JoinColumn({ name: 'size', referencedColumnName: 'food_id' })
  @OneToOne(() => Size)
  size: Size;

  @JoinColumn({ name: 'temperature', referencedColumnName: 'food_id' })
  @OneToOne(() => Temperature)
  temperature: Temperature;
}
