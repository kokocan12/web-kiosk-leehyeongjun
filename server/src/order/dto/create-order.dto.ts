import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsDateString,
} from 'class-validator';

type SizeTypes = 's' | 'm' | 'l';
type TempTypes = 'c' | 'h';
type PaymentTypes = 'card' | 'cash';
type FoodTypes = {
  id: number;
  name: string;
  unit: number;
  options: { size: SizeTypes; temperature: TempTypes };
  eachPrice: number;
};

@ValidatorConstraint({ name: 'valid-payment', async: false })
class IsValidPayment implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    if (text !== 'card' && text !== 'cash') return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be cash or card';
  }
}

@ValidatorConstraint({ name: 'valid-food', async: false })
class IsValidFoods implements ValidatorConstraintInterface {
  validate(foods: FoodTypes[], args: ValidationArguments) {
    if (!Array.isArray(foods)) return false;

    for (const food of foods) {
      if (typeof food.id !== 'number') return false;
      else if (!food.name) return false;
      else if (typeof food.unit !== 'number') return false;
      else if (
        food.options.size !== 's' &&
        food.options.size !== 'm' &&
        food.options.size !== 'l' &&
        food.options.size !== null
      )
        return false;
      else if (
        food.options.temperature !== 'c' &&
        food.options.temperature !== 'h' &&
        food.options.temperature !== null
      )
        return false;
      else if (typeof food.eachPrice !== 'number') return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `($value) must be {
      id: number;
      name: string;
      unit: number;
      options: { size: SizeTypes; temperature: TempTypes };
      eachPrice: number;
    }`;
  }
}

export class CreateOrderDto {
  @Validate(IsValidPayment)
  payment: PaymentTypes;

  @IsDateString()
  date: string;

  @Validate(IsValidFoods)
  foods: FoodTypes[];
}
