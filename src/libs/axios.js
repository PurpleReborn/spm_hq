import axios from 'axios';
import { getUserToken } from 'helpers/storage';

const requestUser = axios.create();
const requestPublic = axios.create();

requestUser.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      authorization: `Bearer ${getUserToken()}`,
      'Content-Type': 'application/json',
    };

    return config;
  },
  (error) => Promise.reject(error)
);

const Axios = {
  requestPublic,
  requestUser,
};

export default Axios;
