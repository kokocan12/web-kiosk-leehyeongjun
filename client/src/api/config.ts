import axios from 'axios';

const baseURL = 'http://localhost:3001/api';
const instance = axios.create({
  baseURL,
  headers: { Accept: '*/*' },
  withCredentials: false,
  timeout: 60000,
});

export { instance as axios };
