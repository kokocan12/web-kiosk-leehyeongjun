import { useAsyncState } from '@lib/global-state';
import { category } from '@/api';

export type CategoryTypes = {
  name: string;
  id: number;
};

const fetcher = async (): Promise<CategoryTypes[]> => {
  const res = await category.getCategories();

  return res.data.categories;
};

export const useCategories = () => {
  const [isLoading, data, revalidate] = useAsyncState(
    'api/categories',
    fetcher,
  );

  return {
    isLoading,
    data,
    revalidate,
  };
};
