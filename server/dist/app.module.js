"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.DelayMiddleware = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const categories_module_1 = require("./categories/categories.module");
const food_module_1 = require("./food/food.module");
const options_module_1 = require("./options/options.module");
const order_module_1 = require("./order/order.module");
let DelayMiddleware = class DelayMiddleware {
    async use(req, res, next) {
        await new Promise((res) => {
            setTimeout(() => {
                res(1);
            }, 800);
        });
        next();
    }
};
DelayMiddleware = __decorate([
    (0, common_1.Injectable)()
], DelayMiddleware);
exports.DelayMiddleware = DelayMiddleware;
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(DelayMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                synchronize: true,
                autoLoadEntities: true,
            }),
            categories_module_1.CategoriesModule,
            food_module_1.FoodModule,
            options_module_1.OptionsModule,
            order_module_1.OrderModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map