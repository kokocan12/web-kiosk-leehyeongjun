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
exports.Temperature = exports.Size = void 0;
const food_entity_1 = require("../../food/entities/food.entity");
const typeorm_1 = require("typeorm");
let Size = class Size {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'food_id' }),
    __metadata("design:type", Number)
], Size.prototype, "food_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'food_id', referencedColumnName: 'id' }),
    (0, typeorm_1.OneToOne)(() => food_entity_1.Food),
    __metadata("design:type", food_entity_1.Food)
], Size.prototype, "food", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Size.prototype, "small", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Size.prototype, "medium", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Size.prototype, "large", void 0);
Size = __decorate([
    (0, typeorm_1.Entity)('SIZE_OPTION_TB')
], Size);
exports.Size = Size;
let Temperature = class Temperature {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'food_id' }),
    __metadata("design:type", Number)
], Temperature.prototype, "food_id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'food_id', referencedColumnName: 'id' }),
    (0, typeorm_1.OneToOne)(() => food_entity_1.Food),
    __metadata("design:type", food_entity_1.Food)
], Temperature.prototype, "food", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Temperature.prototype, "hot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Temperature.prototype, "cool", void 0);
Temperature = __decorate([
    (0, typeorm_1.Entity)('TEMPERATURE_OPTION_TB')
], Temperature);
exports.Temperature = Temperature;
//# sourceMappingURL=option.entity.js.map