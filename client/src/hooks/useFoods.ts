import { useAsyncState } from '@lib/global-state';
import { food } from '@/api';

export type FoodTypes = {
  id: number;
  name: string;
  basePrice: number;
  categoryId: number;
  imgUrl: string;
  start: false;
};

const fetcher = async (): Promise<FoodTypes[]> => {
  const res = await food.getFoods();

  return res.data;
};

export const useFoods = () => {
  const [isLoading, data, revalidate] = useAsyncState('api/foods', fetcher);

  return {
    isLoading,
    data,
    revalidate,
  };
};
