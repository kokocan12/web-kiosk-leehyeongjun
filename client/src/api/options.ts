import { axios } from './config';

const options = {
  getOptions() {
    return axios.get('/options');
  },
};

export { options };
