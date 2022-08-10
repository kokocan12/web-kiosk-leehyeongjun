import { useNavigation, useRouterLoading } from '@lib/router';
import { getSideItems } from '@lib/utils';
import { useEffect, useMemo, useRef } from 'react';
import { useCategories } from './useCategories';
import { useFoods } from './useFoods';

export const useMenuState = () => {
  const { changeQuery, query } = useNavigation();
  const { category } = query;

  const { isLoading: categoryLoading, data: categories } = useCategories();
  const { isLoading: foodLoading, data: foods } = useFoods();
  const done = useRouterLoading();

  const categoryRef = useRef<HTMLUListElement>(null);

  const [leftFoods, middleFoods, rightFoods] = useMemo(() => {
    if (category && categories && foods) {
      return getSideItems(+category, categories, foods);
    }

    return [[], [], []];
  }, [category, categories, foods]);

  const onCategoryClick = (categoryId: number) => {
    query['category'] = categoryId + '';
    changeQuery(query);
  };

  useEffect(() => {
    if (!categoryLoading && !foodLoading) {
      if (!category) onCategoryClick(1);

      done();
    }
  }, [categoryLoading, foodLoading]);

  useEffect(() => {
    const MENU_WIDTH = 96;
    const clientWidth =
      document.body.clientWidth >= 800 ? 800 : document.body.clientWidth;

    categoryRef.current?.scrollTo({
      left:
        (-1 * clientWidth) / 2 + MENU_WIDTH * (+category - 1) + MENU_WIDTH / 2,
      behavior: 'smooth',
    });
  }, [category, categoryRef.current]);

  return {
    categories,
    leftFoods,
    middleFoods,
    rightFoods,
    foods,
    onCategoryClick,
    category,
    categoryRef,
  };
};
