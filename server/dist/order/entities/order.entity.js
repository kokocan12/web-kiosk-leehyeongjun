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
exports.Order = void 0;
const food_entity_1 = require("../../food/entities/food.entity");
const order_history_entity_1 = require("./order-history.entity");
const typeorm_1 = require("typeorm");
let Order = class Order extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'order_history_id', referencedColumnName: 'id' }),
    (0, typeorm_1.ManyToOne)(() => order_history_entity_1.OrderHistory, (history) => history.id),
    __metadata("design:type", Number)
], Order.prototype, "order_history_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 30 }),
    __metadata("design:type", String)
], Order.prototype, "food_name", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'food_id', referencedColumnName: 'id' }),
    (0, typeorm_1.ManyToOne)(() => food_entity_1.Food, (food) => food.id),
    __metadata("design:type", Number)
], Order.prototype, "food_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Order.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Order.prototype, "each_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['S', 'M', 'L'] }),
    __metadata("design:type", String)
], Order.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['C', 'H'] }),
    __metadata("design:type", String)
], Order.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "created_at", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)('ORDER_ITEMS_TB')
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map