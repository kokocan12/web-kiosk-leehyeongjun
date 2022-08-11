import { LogoHeader } from '@components';
import { usePaymentCash } from '@hooks/usePaymentCash';
import { useShoppingBaksetOrders } from '@hooks/useShoppingBasketOrders';
import { useLocation, useNavigation, useRouterLoading } from '@lib/router';
import { comma } from '@lib/utils';
import { useEffect, useMemo } from 'react';

export const PaymentCashInsert = () => {
  const done = useRouterLoading();
  const { orders } = useShoppingBaksetOrders();
  const { insertedCash, setInsertedCash } = usePaymentCash();
  const location = useLocation();
  const { replace } = useNavigation();

  const totalPrice = useMemo(() => {
    const total = Object.values(orders).reduce((acc, curr) => {
      return acc + curr.unit * curr.eachPrice;
    }, 0);

    return total;
  }, [orders]);

  const onCashInsertClick = (cash: number) => {
    setInsertedCash(insertedCash + cash);
  };

  const onPaymentClick = () => {
    replace({ to: '/payment/cash' });
  };

  useEffect(() => {
    if (totalPrice === 0) {
      replace({ to: '/' });
    }
  }, [totalPrice]);

  useEffect(() => {
    done();
  }, []);
  return (
    <div className="payment-cash-insert">
      <LogoHeader />
      <div className="payment-cash-insert-body">
        <h1>현금 결제</h1>
        <h1>
          <button
            className="btn"
            onClick={onCashInsertClick.bind(null, 1000)}
            disabled={insertedCash >= totalPrice}
          >
            1,000원
          </button>
        </h1>
        <h1>
          <button
            className="btn"
            onClick={onCashInsertClick.bind(null, 5000)}
            disabled={insertedCash >= totalPrice}
          >
            5,000원
          </button>
        </h1>
        <h1>
          <button
            onClick={onCashInsertClick.bind(null, 10000)}
            className="btn"
            disabled={insertedCash >= totalPrice}
          >
            10,000원
          </button>
        </h1>
        <h1>
          <button
            onClick={onCashInsertClick.bind(null, 50000)}
            className="btn"
            disabled={insertedCash >= totalPrice}
          >
            50,000원
          </button>
        </h1>
        <br />
        <br />
        <br />
        <h3>주문 금액:{comma(totalPrice)}</h3>
        <h3>투입 금액:{comma(insertedCash)}</h3>
        <h1>
          <button
            className="btn payment-btn"
            disabled={
              location.pathname !== '/payment/cash-insert' ||
              insertedCash < totalPrice
            }
            onClick={onPaymentClick}
          >
            현금결제하기
          </button>
        </h1>
      </div>
    </div>
  );
};
