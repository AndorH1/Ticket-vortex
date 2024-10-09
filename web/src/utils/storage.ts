import { Keys } from '../api/storageKey';

export const storage = {
  getToken: (key: Keys): string | null => {
    const token = localStorage.getItem(key);
    if (!token) {
      console.log('token not found', token);
      return null;
    }
    const data = JSON.parse(token || '');

    return data;
  },

  setToken: (key: Keys, value: string): void => {
    if (!value) {
      return;
    }
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
    return;
  },

  removeToken: (key: Keys): void => {
    localStorage.removeItem(key);
  },
};
