import { useSyncState } from '@lib/global-state';
import { useEffect, useRef } from 'react';
import { OrderTypes } from './useOrderModalOptionState';

let setTimeoutTimer: any = null;
export const useShoppingBasketState = () => {
  const [orders, setOrders] = useSyncState<{ [key: string]: OrderTypes }>(
    'shopping-basket-state',
    {},
  );
  const [restCount, setRestCount] = useSyncState('shopping-count', 0);
  const itemListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (restCount > 0) {
      clearTimeout(setTimeoutTimer);
      setTimeoutTimer = setTimeout(() => {
        setRestCount(restCount - 1);
      }, 1000);
    }

    if (restCount < 0) {
      setOrders({});
    }
  }, [restCount]);

  useEffect(() => {
    setRestCount(10 + Math.random());
    itemListRef.current?.scrollTo({ left: 100000 });
  }, [orders]);

  return { restCount: Math.floor(restCount), orders, setOrders, itemListRef };
};
