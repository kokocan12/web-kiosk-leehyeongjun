import { useAsyncState } from '@lib/global-state';
import { options } from '@/api';

export type FoodSizeOptionTypes = {
  [id: number]: { s?: number; m?: number; l?: number };
};
export type FoodTemperatureOptionTypes = {
  [id: number]: { c?: number; h?: number };
};

export type FoodOptionTypes = {
  size: FoodSizeOptionTypes;
  temperature: FoodTemperatureOptionTypes;
};

const fetcher = async (): Promise<FoodOptionTypes> => {
  const res = await options.getOptions();

  return res.data;
};

export const useFoodOptions = () => {
  const [isLoading, data, revalidate] = useAsyncState('api/options', fetcher);

  return {
    isLoading,
    data,
    revalidate,
  };
};
