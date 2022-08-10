import { useAsyncState } from '@lib/global-state';
import { options } from '@/api';

export type FoodOptionTypes = {
  size: { [id: number]: { s?: number; m?: number; l?: number } };
  temperature: { [id: number]: { c?: number; h?: number } };
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
