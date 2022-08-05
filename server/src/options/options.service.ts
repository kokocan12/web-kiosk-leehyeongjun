import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size, Temperature } from './entities/option.entity';
import { SelectOptionInterface } from './interfaces/options.interface';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Size) private sizeRepo: Repository<Size>,
    @InjectRepository(Temperature) private tempRepo: Repository<Temperature>,
  ) {}

  async getOptions(): Promise<SelectOptionInterface> {
    const optionJson: SelectOptionInterface = {
      size: {},
      temperature: {},
    };

    const sizeData = await this.sizeRepo.find();
    const temperatureData = await this.tempRepo.find();

    sizeData.forEach((size) => {
      optionJson.size[size.food_id] = {
        s: size.small,
        m: size.medium,
        l: size.large,
      };
    });

    temperatureData.forEach((temperature) => {
      optionJson.temperature[temperature.food_id] = {
        c: temperature.cool,
        h: temperature.hot,
      };
    });

    return optionJson;
  }
}
