import { OptionsService } from './options.service';
export declare class OptionsController {
    private readonly optionsService;
    constructor(optionsService: OptionsService);
    getOptions(): Promise<import("./interfaces/options.interface").SelectOptionInterface>;
}
