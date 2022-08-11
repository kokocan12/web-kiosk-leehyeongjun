import { useMenuState } from '@hooks/useMenuState';
import { Header, FoodList } from '@components';

export const Menu = () => {
  const {
    categories,
    onCategoryClick,
    category,
    leftFoods,
    middleFoods,
    rightFoods,
    categoryRef,
  } = useMenuState();

  return (
    <div className="menu">
      <Header
        categoryRef={categoryRef}
        category={category}
        categories={categories!}
        onCategoryClick={onCategoryClick}
      />
      <div className="contents-wrap">
        <FoodList
          leftFoods={leftFoods}
          middleFoods={middleFoods}
          rightFoods={rightFoods}
          categories={categories!}
          currentCategory={category}
        />
      </div>
    </div>
  );
};
