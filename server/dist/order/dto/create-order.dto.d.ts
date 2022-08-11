declare type SizeTypes = 's' | 'm' | 'l';
declare type TempTypes = 'c' | 'h';
declare type PaymentTypes = 'card' | 'cash';
declare type FoodTypes = {
    id: number;
    name: string;
    unit: number;
    options: {
        size: SizeTypes;
        temperature: TempTypes;
    };
    eachPrice: number;
};
export declare class CreateOrderDto {
    payment: PaymentTypes;
    date: string;
    foods: FoodTypes[];
}
export {};
