import { Repository } from 'typeorm';
import { Size, Temperature } from './entities/option.entity';
import { SelectOptionInterface } from './interfaces/options.interface';
export declare class OptionsService {
    private sizeRepo;
    private tempRepo;
    constructor(sizeRepo: Repository<Size>, tempRepo: Repository<Temperature>);
    getOptions(): Promise<SelectOptionInterface>;
}
