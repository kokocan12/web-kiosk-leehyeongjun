import { useNavigation, useRouterLoading } from '@lib/router';
import { getSideItems } from '@lib/utils';
import { useEffect, useMemo } from 'react';
import { useCategories } from './useCategories';
import { useFoods } from './useFoods';

export const useMenuState = () => {
  const { changeQuery, query } = useNavigation();
  const { category } = query;

  const { isLoading: categoryLoading, data: categories } = useCategories();
  const { isLoading: foodLoading, data: foods } = useFoods();
  const done = useRouterLoading();

  const onCategoryClick = (categoryId: number) => {
    query['category'] = categoryId + '';
    changeQuery(query);
  };

  const [leftFoods, middleFoods, rightFoods] = useMemo(() => {
    if (category && categories && foods) {
      return getSideItems(+category, categories, foods);
    }

    return [[], [], []];
  }, [category, categories, foods]);

  useEffect(() => {
    if (!categoryLoading && !foodLoading) {
      if (!category) onCategoryClick(1);

      done();
    }
  }, [categoryLoading, foodLoading]);

  return {
    categories,
    leftFoods,
    middleFoods,
    rightFoods,
    foods,
    onCategoryClick,
    category,
  };
};
