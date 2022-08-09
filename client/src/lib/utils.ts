import { FoodTypes } from '@hooks/useFoods';
import { CategoryTypes } from '@hooks/useCategories';
export function invariant(condition: boolean, message: string) {
  if (condition) throw Error(message);
}

export function isPlainObject(something: any) {
  return !!something && Object.getPrototypeOf(something) === Object.prototype;
}

export function stringToQuery(str: string): {
  [key: string]: string;
} {
  const stringArray: string[] = str.replace('?', '').split('&');

  const dict: {
    [key: string]: string;
  } = {};

  for (let i = 0; i < stringArray.length; i++) {
    const [key, val] = stringArray[i].split('=');

    if (val) dict[key] = val;
  }

  return dict;
}

export function queryToString(query: { [key: string]: string }) {
  if (!query) return '';

  let string = '';

  const keys = Object.keys(query);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (query[key]) {
      if (i === 0) string += '?';

      string += `${key}=${query[key]}&`;
    }
  }

  return string ? string.slice(0, string.length - 1) : '';
}

export function getSideCategories(
  categories: CategoryTypes[],
  currentCategory: number,
) {
  const { length } = categories;
  let index = 0;
  for (let i = 0; i < length; i++) {
    const category = categories[i];

    if (category.id === currentCategory) {
      index = i;
      break;
    }
  }

  const leftCategory = categories[(index - 1 + length) % length].id;
  const rightCategory = categories[(index + 1) % length].id;

  return [leftCategory, rightCategory];
}

export function getSideItems(
  currentCategory: number,
  categories: CategoryTypes[],
  foods: FoodTypes[],
): [FoodTypes[], FoodTypes[], FoodTypes[]] {
  const [leftCategory, rightCategory] = getSideCategories(
    categories,
    currentCategory,
  );

  const leftFoods = foods.filter((food) => food.categoryId === leftCategory);
  const middleFoods = foods.filter(
    (food) => food.categoryId === currentCategory,
  );
  const rightFoods = foods.filter((food) => food.categoryId === rightCategory);

  return [leftFoods, middleFoods, rightFoods];
}
