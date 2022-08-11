import { useEffect, useState } from 'react';
import { FoodOptionTypes } from './useFoodOptions';
import { FoodTypes } from './useFoods';

type SizeOptionTypes = 's' | 'm' | 'l';
type TemperatureTypes = 'c' | 'h';
type OptionTypes = { size: SizeOptionTypes; temperature: TemperatureTypes };

export type OrderTypes = {
  id: number;
  name: string;
  unit: number;
  options: OptionTypes;
  eachPrice: number;
  imgUrl: string;
};

export const useOrderModalOptionState = (
  selectFood: FoodTypes,
  foodSizeOptions: FoodOptionTypes['size'][number],
  foodTemperatureOptions: FoodOptionTypes['temperature'][number],
) => {
  const [order, setOrder] = useState<OrderTypes>({
    id: null!,
    name: null!,
    options: { size: null!, temperature: null! }!,
    unit: null!,
    eachPrice: null!,
    imgUrl: null!,
  });

  const onOptionChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;

    const newOptions: OptionTypes = { ...order.options, [name]: value };

    const eachPrice = getEachPrice(
      +selectFood?.basePrice!,
      +foodSizeOptions![newOptions.size]!,
      +foodTemperatureOptions![newOptions.temperature]!,
      order.unit,
    );

    setOrder({ ...order, options: newOptions, eachPrice });
  };

  const onCountChangeClick = (diff: number) => {
    const newCount = Math.max(+order.unit + diff, 1);

    const eachPrice = getEachPrice(
      +selectFood?.basePrice!,
      +foodSizeOptions![order.options.size]!,
      +foodTemperatureOptions![order.options.temperature]!,
      newCount,
    );

    setOrder({ ...order, eachPrice, unit: newCount });
  };

  const getEachPrice = (
    basePrice: number,
    sizePrice: number,
    temperaturePrice: number,
    unit: number,
  ) => {
    return (basePrice! + sizePrice + temperaturePrice) * unit;
  };

  useEffect(() => {
    if (selectFood && foodSizeOptions && foodTemperatureOptions) {
      const eachPrice = getEachPrice(
        +selectFood?.basePrice!,
        +foodSizeOptions!.s!,
        +foodTemperatureOptions!.h!,
        1,
      );

      setOrder({
        id: selectFood?.id!,
        name: selectFood?.name!,
        options: { size: 's', temperature: 'c' },
        unit: 1,
        eachPrice: eachPrice,
        imgUrl: selectFood.imgUrl,
      });
    }
  }, [selectFood, foodSizeOptions, foodTemperatureOptions]);

  return {
    onOptionChange,
    onCountChangeClick,
    order,
  };
};
