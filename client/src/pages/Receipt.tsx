import { order } from '@api';
import { LogoHeader } from '@components';
import { useNavigation, useRouterLoading } from '@lib/router';
import { comma } from '@lib/utils';

import { useEffect, useState } from 'react';

interface OrderHistoryDataInterface {
  id: number;
  order_num: number;
  total_price: string;
  payment: string;
}

interface OrderDataInterface {
  id: number;
  food_name: string;
  unit: 1;
  each_price: string;
  size: string;
  temperature: string;
}

export const Receipt = () => {
  const done = useRouterLoading();
  const { query, push } = useNavigation();
  const [timer, setTimer] = useState(Math.random());

  const [orderDetail, setOrderDetail] = useState<{
    orderHistory: OrderHistoryDataInterface;
    orders: OrderDataInterface[];
  }>({ orderHistory: null!, orders: null! });
  const orderId = query.order;

  const getOrderInfo = async () => {
    if (!orderId) {
      push({ to: '/' });
    }
    try {
      const res = await order.getOrder(+orderId);

      const { orderHistory, orders } = res.data;
      setOrderDetail({ orderHistory, orders });
      setTimer(10);
    } catch (err) {
      alert(err);
    }
    done();
  };
  useEffect(() => {
    getOrderInfo();
  }, []);

  useEffect(() => {
    if (timer >= 1) {
      setTimeout(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }

    if (timer === 0) {
      push({ to: '/' });
    }
  }, [timer]);

  return (
    <div className="receipt">
      <LogoHeader />
      {orderDetail.orders && orderDetail.orderHistory && (
        <div className="receipt-body">
          <h1 className="complete-text">주문이 완료되었습니다 🎉</h1>

          <h1 className="order-text">
            주문번호{orderDetail.orderHistory.order_num}
          </h1>
          <div className="food-list-wrap">
            <ul className="food-list">
              {orderDetail.orders.map((item) => {
                return (
                  <li key={item.id}>
                    {item.food_name}(사이즈:{item.size})(온도:{item.temperature}
                    ) * {item.unit}
                  </li>
                );
              })}
            </ul>
          </div>
          <br />
          <br />
          <div className="detail-wrap">
            <h3>
              결제방식:
              {orderDetail.orderHistory.payment === 'CARD' ? '카드' : '현금'}
            </h3>
            <h3>총결제금액:{comma(+orderDetail.orderHistory.total_price)}</h3>
          </div>
          <h3 className="timer-text">
            이 화면은 {timer}초 후 자동으로 사라집니다.
          </h3>
        </div>
      )}
    </div>
  );
};
