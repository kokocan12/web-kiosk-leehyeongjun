import {
  getSideCategories,
  queryToString,
  stringToQuery,
  getSideItems,
} from '../utils';

import { foods, categories } from './fake-data';

describe('Test utils', () => {
  describe('Test function stringToQuery()', () => {
    test('Empty string', () => {
      const tc = '';

      expect(stringToQuery(tc)).toEqual({});
    });

    test('Question mark', () => {
      const tc = '?';

      expect(stringToQuery(tc)).toEqual({});
    });

    test('One key with value', () => {
      const tc = '?category=1';

      expect(stringToQuery(tc)).toEqual({ category: '1' });
    });

    test('One key without value', () => {
      const tc = '?category=';

      expect(stringToQuery(tc)).toEqual({});
    });

    test('Tow keys with value', () => {
      const tc = '?category=1&food=32';

      expect(stringToQuery(tc)).toEqual({ category: '1', food: '32' });
    });

    test('Tow keys without value', () => {
      const tc = '?category=&food=32';

      expect(stringToQuery(tc)).toEqual({ food: '32' });
    });

    test('Tow keys with value', () => {
      const tc = '?category=4&food=32';

      expect(stringToQuery(tc)).toEqual({ category: '4', food: '32' });
    });

    test('End text is "&" ', () => {
      const tc = '?category=4&food=32&';

      expect(stringToQuery(tc)).toEqual({ category: '4', food: '32' });
    });
  });

  describe('Test function queryToString()', () => {
    test('undefined', () => {
      const tc = undefined as unknown as { [key: string]: string };

      expect(queryToString(tc)).toEqual('');
    });

    test('null', () => {
      const tc = null as unknown as { [key: string]: string };

      expect(queryToString(tc)).toEqual('');
    });

    test('empty object', () => {
      const tc = {} as unknown as { [key: string]: string };

      expect(queryToString(tc)).toEqual('');
    });

    test('one key', () => {
      const tc = { category: 1 } as unknown as { [key: string]: string };

      expect(queryToString(tc)).toEqual('?category=1');
    });

    test('two keys with values', () => {
      const tc = { category: 1, food: 32 } as unknown as {
        [key: string]: string;
      };

      expect(queryToString(tc)).toEqual('?category=1&food=32');
    });

    test('two keys without values', () => {
      const tc = { category: 1, food: undefined } as unknown as {
        [key: string]: string;
      };

      expect(queryToString(tc)).toEqual('?category=1');
    });
  });

  describe('Test that getSideCategories finds side categories well or not', () => {
    test('first category', () => {
      const [left, right] = getSideCategories(categories, 1);

      expect([left, right]).toEqual([12, 2]);
    });

    test('middle category', () => {
      const [left, right] = getSideCategories(categories, 4);

      expect([left, right]).toEqual([3, 5]);
    });

    test('last category', () => {
      const [left, right] = getSideCategories(categories, 12);

      expect([left, right]).toEqual([11, 1]);
    });
  });

  describe('Test that getSideItems return desirable side items', () => {
    test('first category', () => {
      const currentCategory = 1;

      const [l, m, r] = getSideItems(currentCategory, categories, foods);

      expect(l).toEqual([
        {
          id: 53,
          name: '생크림스콘',
          basePrice: 5500,
          categoryId: 12,
          imgUrl: 'a.png',
          start: false,
        },
      ]);

      expect(m).toEqual([
        {
          id: 1,
          name: '아메리카노',
          basePrice: 4500,
          categoryId: 1,
          imgUrl: 'a.png',
          start: false,
        },
      ]);

      expect(r).toEqual([
        {
          id: 5,
          name: '초콜릿라떼',
          basePrice: 6500,
          categoryId: 2,
          imgUrl: 'a.png',
          start: false,
        },
      ]);
    });

    test('middle category', () => {
      const currentCategory = 4;

      const [l, m, r] = getSideItems(currentCategory, categories, foods);

      expect(l).toEqual([
        {
          id: 10,
          name: '녹차',
          basePrice: 5500,
          categoryId: 3,
          imgUrl: 'a.png',
          start: false,
        },
      ]);

      expect(m).toEqual([
        {
          id: 16,
          name: '사과쥬스',
          basePrice: 6500,
          categoryId: 4,
          imgUrl: 'a.png',
          start: false,
        },
      ]);

      expect(r).toEqual([
        {
          id: 22,
          name: '일리디카페인',
          basePrice: 6500,
          categoryId: 5,
          imgUrl: 'a.png',
          start: false,
        },
      ]);
    });

    test('last category', () => {
      const currentCategory = 12;

      const [l, m, r] = getSideItems(currentCategory, categories, foods);

      expect(l).toEqual([
        {
          id: 48,
          name: '딸기마카롱',
          basePrice: 7500,
          categoryId: 11,
          imgUrl: 'a.png',
          start: false,
        },
      ]);

      expect(m).toEqual([
        {
          id: 53,
          name: '생크림스콘',
          basePrice: 5500,
          categoryId: 12,
          imgUrl: 'a.png',
          start: false,
        },
      ]);

      expect(r).toEqual([
        {
          id: 1,
          name: '아메리카노',
          basePrice: 4500,
          categoryId: 1,
          imgUrl: 'a.png',
          start: false,
        },
      ]);
    });
  });
});
