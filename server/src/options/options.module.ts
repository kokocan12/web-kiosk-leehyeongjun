import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size, Temperature } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size, Temperature])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
