import { axios } from './config';

const food = {
  getFoods() {
    return axios.get('/foods');
  },
};

export { food };
