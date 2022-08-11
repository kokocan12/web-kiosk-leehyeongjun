import { useSyncState } from '@lib/global-state';
import { OrderTypes } from './useOrderModalOptionState';

export const useShoppingBaksetOrders = () => {
  const [orders, setOrders] = useSyncState<{ [key: string]: OrderTypes }>(
    'shopping-basket-state',
    {},
  );

  return {
    orders,
    setOrders,
  };
};
