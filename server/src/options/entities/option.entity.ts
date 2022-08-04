import { Food } from 'src/food/entities/food.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('SIZE_OPTION_TB')
export class Size {
  @PrimaryColumn()
  @OneToOne(() => Food, (food) => food.id)
  food_id: number;

  @Column({ type: 'decimal', nullable: true })
  small: number;

  @Column({ type: 'decimal', nullable: true })
  medium: number;

  @Column({ type: 'decimal', nullable: true })
  large: number;
}

@Entity('TEMPERATURE_OPTION_TB')
export class Temperature {
  @PrimaryColumn()
  @OneToOne(() => Food, (food) => food.id)
  food_id: number;

  @Column({ type: 'decimal', nullable: true })
  hot: number;

  @Column({ type: 'decimal', nullable: true })
  cool: number;
}
