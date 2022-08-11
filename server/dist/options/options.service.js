"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const option_entity_1 = require("./entities/option.entity");
let OptionsService = class OptionsService {
    constructor(sizeRepo, tempRepo) {
        this.sizeRepo = sizeRepo;
        this.tempRepo = tempRepo;
    }
    async getOptions() {
        const optionJson = {
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
};
OptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(option_entity_1.Size)),
    __param(1, (0, typeorm_1.InjectRepository)(option_entity_1.Temperature)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OptionsService);
exports.OptionsService = OptionsService;
//# sourceMappingURL=options.service.js.map