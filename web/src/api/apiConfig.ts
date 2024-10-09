import axios from 'axios';
import { storage } from '../utils/storage';

export const API_URL = 'http://localhost:3000';

export const publicApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const privateApi = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

privateApi.interceptors.request.use(
  (config) => {
    const token = storage.getToken('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized. Redirecting to login...');
    }
    return Promise.reject(error);
  }
);
