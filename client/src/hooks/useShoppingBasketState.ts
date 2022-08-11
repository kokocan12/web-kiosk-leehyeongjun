import { useSyncState } from '@lib/global-state';
import { useLocation, useNavigation } from '@lib/router';
import { useEffect, useRef } from 'react';
import { useShoppingBaksetOrders } from './useShoppingBasketOrders';

let setTimeoutTimer: any = null;
export const useShoppingBasketState = () => {
  const noCountPages = ['/payment', '/payment/cash', '/payment/card'];
  const { orders, setOrders } = useShoppingBaksetOrders();
  const location = useLocation();
  const navigation = useNavigation();

  const [restCount, setRestCount] = useSyncState('shopping-count', 0);
  const itemListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (restCount > 0) {
      clearTimeout(setTimeoutTimer);
      if (!noCountPages.includes(location.pathname)) {
        setTimeoutTimer = setTimeout(() => {
          setRestCount(restCount - 1);
        }, 1000);
      }
    }

    if (restCount < 0) {
      setOrders({});
    }
  }, [restCount, navigation]);

  useEffect(() => {
    setRestCount(10 + Math.random());
    itemListRef.current?.scrollTo({ left: 100000 });
  }, [orders]);

  return { restCount: Math.floor(restCount), orders, setOrders, itemListRef };
};
