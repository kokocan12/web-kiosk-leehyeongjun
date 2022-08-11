import { OrderTypes } from '@hooks/useOrderModalOptionState';
import { axios } from './config';

export const order = {
  postOrder(orders: OrderTypes[], payment: 'cash' | 'card') {
    return axios.post('/order', {
      foods: orders,
      payment,
      date: new Date(),
    });
  },
};
