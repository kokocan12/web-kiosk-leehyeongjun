import { Food } from 'src/food/entities/food.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SIZE_OPTION_TB')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', nullable: true })
  small: number;

  @Column({ type: 'decimal', nullable: true })
  medium: number;

  @Column({ type: 'decimal', nullable: true })
  large: number;
}

@Entity('TEMPERATURE_OPTION_TB')
export class Temperature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', nullable: true })
  hot: number;

  @Column({ type: 'decimal', nullable: true })
  cool: number;
}
