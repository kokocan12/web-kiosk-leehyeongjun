import { order } from '@api';
import { usePaymentCash } from '@hooks/usePaymentCash';
import { useShoppingBaksetOrders } from '@hooks/useShoppingBasketOrders';
import { useNavigation } from '@lib/router';
import { isEmptyObject, setBodyOverflowYHidden } from '@lib/utils';
import { useEffect } from 'react';

export const PaymentCash = () => {
  const { orders, setOrders } = useShoppingBaksetOrders();
  const { push, replace } = useNavigation();
  const { insertedCash, setInsertedCash } = usePaymentCash();

  const pay = async () => {
    if (isEmptyObject(orders) || !insertedCash) {
      push({ to: '/menu' });
      return;
    }

    try {
      const res = await order.postOrder(Object.values(orders), 'cash');
      const orderId = res.data.orderHistory.id;
      setOrders({});
      setInsertedCash(0);
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

  return <div className="payment-cash"></div>;
};
