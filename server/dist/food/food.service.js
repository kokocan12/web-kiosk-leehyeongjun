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
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const food_entity_1 = require("./entities/food.entity");
let FoodService = class FoodService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    findAll() {
        return this.categoryRepository.find();
    }
    async findFoodsByCategory(category) {
        const connection = this.categoryRepository.manager.connection;
        const qr = connection.createQueryRunner();
        qr.startTransaction();
        const builder = qr.manager.createQueryBuilder();
        builder.from(food_entity_1.Food, 'food').leftJoin('food.category', 'category');
        if (category)
            builder.where('food.category = :category', { category });
        const foods = await builder
            .select([
            'food.id as id',
            'food.name as name',
            'base_price as basePrice',
            'category.id as categoryId',
            'img_url as imgUrl',
        ])
            .getRawMany();
        foods.forEach((food) => {
            food.basePrice = +food.basePrice;
            food.start = false;
        });
        qr.release();
        return foods;
    }
};
FoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(food_entity_1.Food)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FoodService);
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map