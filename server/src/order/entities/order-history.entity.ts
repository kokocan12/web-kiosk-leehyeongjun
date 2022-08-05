import { Order } from 'src/order/entities/order.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ORDER_HISTORY_TB')
export class OrderHistory extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', default: 1 })
  order_num: number;

  @Column({ type: 'decimal' })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'enum', enum: ['CARD', 'CASH'] })
  payment: string;

  @Column({ type: 'tinyint', default: 0 })
  cancel: number;

  @OneToMany(() => Order, (order) => order.order_history_id)
  orders: Order[];
}
