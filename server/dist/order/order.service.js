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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const date_1 = require("../utils/date");
const typeorm_2 = require("typeorm");
const order_history_entity_1 = require("./entities/order-history.entity");
const order_entity_1 = require("./entities/order.entity");
let OrderService = class OrderService {
    constructor(orderHistoryRepo, orderRepo) {
        this.orderHistoryRepo = orderHistoryRepo;
        this.orderRepo = orderRepo;
    }
    async createOrder(order) {
        const lastOrderHistoryAtYesterday = await this.orderHistoryRepo.find({
            where: {
                created_at: (0, typeorm_2.Between)((0, date_1.getTodayMin)(), (0, date_1.getTodayMax)()),
            },
            order: { id: 'desc' },
        });
        const orderNum = lastOrderHistoryAtYesterday[0]
            ? lastOrderHistoryAtYesterday[0].order_num + 1
            : 1;
        const orderHistory = new order_history_entity_1.OrderHistory();
        const orders = [];
        let totalPrice = order.foods.reduce((acc, curr) => {
            const order = new order_entity_1.Order();
            order.each_price = curr.eachPrice;
            order.food_id = curr.id;
            order.unit = curr.unit;
            order.size = curr.options.size;
            order.temperature = curr.options.temperature;
            order.order_history_id = orderHistory.id;
            order.food_name = curr.name;
            orders.push(order);
            return acc + curr.unit * curr.eachPrice;
        }, 0);
        orderHistory.order_num = orderNum;
        orderHistory.total_price = totalPrice;
        orderHistory.payment = order.payment.toUpperCase();
        await orderHistory.save();
        orders.forEach((order) => {
            order.order_history_id = orderHistory.id;
            order.save();
        });
        return { orderHistory, orders };
    }
    async getOrderDetail(orderId) {
        const orderHistoryPromise = this.orderHistoryRepo.findOne({
            where: { id: orderId },
        });
        const builder = this.orderHistoryRepo.manager.createQueryBuilder();
        const historyPromise = builder
            .from(order_entity_1.Order, 'order')
            .where('order.order_history_id = :orderId', { orderId })
            .getRawMany();
        const [orderHistory, orders] = await Promise.all([
            orderHistoryPromise,
            historyPromise,
        ]);
        return { orderHistory, orders };
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_history_entity_1.OrderHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map