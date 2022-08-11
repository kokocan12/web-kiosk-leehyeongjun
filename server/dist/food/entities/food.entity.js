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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const category_entity_1 = require("../../categories/entities/category.entity");
const option_entity_1 = require("../../options/entities/option.entity");
const order_entity_1 = require("../../order/entities/order.entity");
const typeorm_1 = require("typeorm");
let Food = class Food {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Food.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 30, unique: true }),
    __metadata("design:type", String)
], Food.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Food.prototype, "img_url", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'category' }),
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.id),
    __metadata("design:type", category_entity_1.Category)
], Food.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Food.prototype, "base_price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.food_id),
    __metadata("design:type", Array)
], Food.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'size', referencedColumnName: 'food_id' }),
    (0, typeorm_1.OneToOne)(() => option_entity_1.Size),
    __metadata("design:type", option_entity_1.Size)
], Food.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'temperature', referencedColumnName: 'food_id' }),
    (0, typeorm_1.OneToOne)(() => option_entity_1.Temperature),
    __metadata("design:type", option_entity_1.Temperature)
], Food.prototype, "temperature", void 0);
Food = __decorate([
    (0, typeorm_1.Entity)('FOOD_TB')
], Food);
exports.Food = Food;
//# sourceMappingURL=food.entity.js.map