import { Food } from 'src/food/entities/food.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SIZE_OPTION_TB')
export class Size {
  @PrimaryColumn({ name: 'food_id' })
  food_id: number;

  @JoinColumn({ name: 'food_id', referencedColumnName: 'id' })
  @OneToOne(() => Food)
  food: Food;

  @Column({ type: 'decimal', nullable: true })
  small: number;

  @Column({ type: 'decimal', nullable: true })
  medium: number;

  @Column({ type: 'decimal', nullable: true })
  large: number;
}

@Entity('TEMPERATURE_OPTION_TB')
export class Temperature {
  @PrimaryColumn({ name: 'food_id' })
  food_id: number;

  @JoinColumn({ name: 'food_id', referencedColumnName: 'id' })
  @OneToOne(() => Food)
  food: Food;

  @Column({ type: 'decimal', nullable: true })
  hot: number;

  @Column({ type: 'decimal', nullable: true })
  cool: number;
}
