import { User } from '../services/schemas/UserSchema';
import { setData, getData, removeData } from './asyncStorage';

const CURRENT_USER = 'CURRENT_USER';

export const saveUser = async (user: User | null) => {
  await setData(CURRENT_USER, JSON.stringify(user));
};

export const loadUser = async () => {
  const user = await getData(CURRENT_USER);
  return user !== null ? JSON.parse(user) : null;
};

export const removeUser = async () => {
  await removeData(CURRENT_USER);
};
