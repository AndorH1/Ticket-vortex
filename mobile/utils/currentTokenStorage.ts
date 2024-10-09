import { setData, getData, removeData } from './asyncStorage';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const saveToken = async (token: string) => {
  await setData(ACCESS_TOKEN, token);
};

export const loadToken = async () => {
  const token = await getData(ACCESS_TOKEN);
  return token;
};

export const removeToken = async () => {
  await removeData(ACCESS_TOKEN);
};
