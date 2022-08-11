import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({
  baseURL,
  headers: { Accept: '*/*' },
  withCredentials: false,
  timeout: 60000,
});

export { instance as axios };
