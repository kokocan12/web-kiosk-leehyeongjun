import { order } from '@api';
import { useShoppingBaksetOrders } from '@hooks/useShoppingBasketOrders';
import { useNavigation, useRouterLoading } from '@lib/router';
import { isEmptyObject, setBodyOverflowYHidden } from '@lib/utils';

import { useEffect } from 'react';

export const PaymentCard = () => {
  const { orders, setOrders } = useShoppingBaksetOrders();
  const { push, replace } = useNavigation();

  const pay = async () => {
    if (isEmptyObject(orders)) {
      push({ to: '/memu' });
      return;
    }

    try {
      const res = await order.postOrder(Object.values(orders), 'card');
      const orderId = res.data.orderHistory.id;
      setOrders({});
      replace({ to: `/receipt?order=${orderId}` });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    setBodyOverflowYHidden(true);
    pay();

    return () => setBodyOverflowYHidden(false);
  }, []);

  return <div className="payment-card"></div>;
};
