import { FoodTypes } from '@hooks/useFoods';
import { CategoryTypes } from '@hooks/useCategories';
import { OrderTypes } from '@hooks/useOrderModalOptionState';
export function invariant(condition: boolean, message: string) {
  if (condition) throw Error(message);
}

export function isPlainObject(something: any) {
  return !!something && Object.getPrototypeOf(something) === Object.prototype;
}

export function isEmptyObject(something: any) {
  const keys = Object.keys(something);

  return keys.length === 0;
}

export function orderToCode(order: OrderTypes) {
  return `${order.id}-${order.options.size}-${order.options.temperature}`;
}

export function combineOrder(order: OrderTypes, order2: OrderTypes) {
  const newOrder: OrderTypes = { ...order, unit: order.unit + order2.unit };
  return newOrder;
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

export function stringToHashObj(str: string): {
  [key: string]: string;
} {
  const stringArray: string[] = str.replace('#', '').split('&');

  const dict: {
    [key: string]: string;
  } = {};

  for (let i = 0; i < stringArray.length; i++) {
    const [key, val] = stringArray[i].split('=');

    if (val) dict[key] = val;
  }

  return dict;
}

export function hashObjToString(hash: { [key: string]: string }) {
  if (!hash) return '';

  let string = '';

  const keys = Object.keys(hash);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (hash[key]) {
      if (i === 0) string += '#';

      string += `${key}=${hash[key]}&`;
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

export const setBodyOverflowYHidden = (hidden: boolean) => {
  if (hidden) {
    document.body.style.maxHeight = '100vh';
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.maxHeight = '';
    document.body.style.overflowY = '';
  }
};

export const comma = (num: number) => {
  if (num === null || num === undefined || isNaN(+num)) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
