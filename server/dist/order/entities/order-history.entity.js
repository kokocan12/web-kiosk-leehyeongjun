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
exports.OrderHistory = void 0;
const order_entity_1 = require("./order.entity");
const typeorm_1 = require("typeorm");
let OrderHistory = class OrderHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], OrderHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], OrderHistory.prototype, "order_num", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], OrderHistory.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderHistory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['CARD', 'CASH'] }),
    __metadata("design:type", String)
], OrderHistory.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], OrderHistory.prototype, "cancel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.order_history_id),
    __metadata("design:type", Array)
], OrderHistory.prototype, "orders", void 0);
OrderHistory = __decorate([
    (0, typeorm_1.Entity)('ORDER_HISTORY_TB')
], OrderHistory);
exports.OrderHistory = OrderHistory;
//# sourceMappingURL=order-history.entity.js.map