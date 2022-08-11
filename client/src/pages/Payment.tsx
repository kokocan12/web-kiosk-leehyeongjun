import { LogoHeader } from '@components';
import { useShoppingBaksetOrders } from '@hooks/useShoppingBasketOrders';
import { useNavigation, useRouterLoading } from '@lib/router';
import { isEmptyObject } from '@lib/utils';
import { useEffect } from 'react';
import { CashIcon, CardIcon } from '@icons';

export const Payment = () => {
  const navigation = useNavigation();
  const done = useRouterLoading();
  const { orders } = useShoppingBaksetOrders();

  const onClickPayment = (type: string) => {
    if (type === 'card') {
      navigation.replace({ to: `/payment/${type}` });
    }

    if (type === 'cash-insert') {
      navigation.push({ to: `/payment/${type}` });
    }
  };

  useEffect(() => {
    done();
  }, []);

  useEffect(() => {
    if (isEmptyObject(orders)) {
      navigation.replace({ to: '/menu' });
    }
  }, [orders]);

  return (
    <div className="payment">
      <LogoHeader />

      <div className="payment-methods-wrap">
        <button
          onClick={onClickPayment.bind(null, 'card')}
          className="payment-wrap"
        >
          <img className="payment-icon" src={CardIcon} alt="card-icon" />
          <span className="payment-text">카드결제</span>
        </button>
        <button
          onClick={onClickPayment.bind(null, 'cash-insert')}
          className="payment-wrap"
        >
          <img className="payment-icon" src={CashIcon} alt="cash-icon" />
          <span className="payment-text">현금결제</span>
        </button>
      </div>
    </div>
  );
};
