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
exports.CreateOrderDto = void 0;
const class_validator_1 = require("class-validator");
let IsValidPayment = class IsValidPayment {
    validate(text, args) {
        if (text !== 'card' && text !== 'cash')
            return false;
        return true;
    }
    defaultMessage(args) {
        return '($value) must be cash or card';
    }
};
IsValidPayment = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'valid-payment', async: false })
], IsValidPayment);
let IsValidFoods = class IsValidFoods {
    validate(foods, args) {
        if (!Array.isArray(foods))
            return false;
        for (const food of foods) {
            if (typeof food.id !== 'number')
                return false;
            else if (!food.name)
                return false;
            else if (typeof food.unit !== 'number')
                return false;
            else if (food.options.size !== 's' &&
                food.options.size !== 'm' &&
                food.options.size !== 'l' &&
                food.options.size !== null)
                return false;
            else if (food.options.temperature !== 'c' &&
                food.options.temperature !== 'h' &&
                food.options.temperature !== null)
                return false;
            else if (typeof food.eachPrice !== 'number')
                return false;
        }
        return true;
    }
    defaultMessage(args) {
        return `($value) must be {
      id: number;
      name: string;
      unit: number;
      options: { size: SizeTypes; temperature: TempTypes };
      eachPrice: number;
    }`;
    }
};
IsValidFoods = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'valid-food', async: false })
], IsValidFoods);
class CreateOrderDto {
}
__decorate([
    (0, class_validator_1.Validate)(IsValidPayment),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "payment", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.Validate)(IsValidFoods),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "foods", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map