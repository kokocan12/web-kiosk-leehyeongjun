import { axios } from './config';

const category = {
  getCategories() {
    return axios.get('/categories');
  },
};

export { category };
