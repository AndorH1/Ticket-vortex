import axios, { AxiosInstance } from 'axios';
import { baseURLNestBackend } from '../../utils/utils';

export const publicApi: AxiosInstance = axios.create({
  baseURL: baseURLNestBackend,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: baseURLNestBackend,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  privateApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete privateApi.defaults.headers.common['Authorization'];
};
