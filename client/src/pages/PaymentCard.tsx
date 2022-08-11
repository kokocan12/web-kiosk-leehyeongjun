import { order } from '@api';
import { LogoHeader } from '@components';
import { useShoppingBaksetOrders } from '@hooks/useShoppingBasketOrders';
import { useNavigation, useRouterLoading } from '@lib/router';
import { isEmptyObject, setBodyOverflowYHidden } from '@lib/utils';
import { doesNotMatch } from 'assert';
import { useEffect } from 'react';

export const PaymentCard = () => {
  const { orders } = useShoppingBaksetOrders();
  const { push } = useNavigation();
  const done = useRouterLoading();

  const pay = async () => {
    if (isEmptyObject(orders)) {
      push({ to: '/memu' });
    }

    try {
      const res = await order.postOrder(Object.values(orders), 'card');
      const orderId = res.data.orderHistory.id;

      push({ to: `/receipt?order=${orderId}` });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    setBodyOverflowYHidden(true);
    pay();

    return () => setBodyOverflowYHidden(false);
  }, []);

  return (
    <div className="payment-card">
      <LogoHeader />
    </div>
  );
};
