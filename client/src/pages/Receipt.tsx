import { LogoHeader } from '@components';
import { useNavigation, useRouterLoading } from '@lib/router';

import { useEffect } from 'react';

export const Receipt = () => {
  const done = useRouterLoading();
  const { query, push } = useNavigation();

  const orderId = query.order;

  const getOrderInfo = async () => {
    if (!orderId) {
      push({ to: '/' });
    }

    done();
  };
  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <div className="receipt">
      <LogoHeader />
    </div>
  );
};
