import { Food } from 'src/food/entities/food.entity';
import { OrderHistory } from 'src/order-history/entities/order-history.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ORDER_ITEMS_TB')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'order_history_id', referencedColumnName: 'id' })
  @ManyToOne(() => OrderHistory, (history) => history.id)
  order_history_id: number;

  @Column({ type: 'char', length: 30 })
  food_name: string;

  @JoinColumn({ name: 'food_id', referencedColumnName: 'id' })
  @ManyToOne(() => Food, (food) => food.id)
  food_id: Food;

  @Column({ type: 'int' })
  unit: number;

  @Column({ type: 'decimal' })
  each_price: number;

  @Column({ type: 'enum', enum: ['S', 'M', 'L'] })
  size: string;

  @Column({ type: 'enum', enum: ['C', 'H'] })
  temperature: string;

  @CreateDateColumn()
  created_at: Date;
}
