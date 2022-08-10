import { CategoryTypes } from '@hooks/useCategories';
import { useFoodListSlider } from '@hooks/useFoodListSlider';
import { FoodTypes } from '@hooks/useFoods';
import { useNavigation } from '@lib/router';

type FoodListPropTypes = {
  leftFoods: FoodTypes[];
  middleFoods: FoodTypes[];
  rightFoods: FoodTypes[];
  currentCategory: string;
  categories: CategoryTypes[];
};

export const FoodList = ({
  leftFoods,
  middleFoods,
  rightFoods,
  currentCategory,
  categories,
}: FoodListPropTypes) => {
  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    moveX,
    transition,
    onTransitionEnd,
  } = useFoodListSlider(categories, currentCategory);

  const { changeHash, hash } = useNavigation();

  const onClickFood = (foodId: number) => {
    hash.order = foodId + '';
    changeHash(hash);
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="food-container"
    >
      <div
        className="food-slide-wrap"
        style={{
          transform: `translateX(${moveX}px)`,
          ...(transition.current ? { transition: '200ms ease-out' } : {}),
        }}
        onTransitionEnd={onTransitionEnd}
      >
        <ul className="food-list-wrap left">
          {leftFoods.map((foodItem) => {
            return (
              <li className="food-item" key={foodItem.id}>
                <span className="food-text">{foodItem.name}</span>
                <img
                  className="food-img"
                  src={foodItem.imgUrl}
                  alt="food-img"
                />
              </li>
            );
          })}
        </ul>
        <ul className="food-list-wrap middle">
          {middleFoods.map((foodItem) => {
            return (
              <li
                onClick={onClickFood.bind(null, foodItem.id)}
                className="food-item"
                key={foodItem.id}
              >
                <span className="food-text">{foodItem.name}</span>
                <img
                  className="food-img"
                  src={foodItem.imgUrl}
                  alt="food-img"
                />
              </li>
            );
          })}
        </ul>
        <ul className="food-list-wrap right">
          {rightFoods.map((foodItem) => {
            return (
              <li className="food-item" key={foodItem.id}>
                <span className="food-text">{foodItem.name}</span>
                <img
                  className="food-img"
                  src={foodItem.imgUrl}
                  alt="food-img"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
