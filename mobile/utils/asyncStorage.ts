import AsyncStorage from '@react-native-async-storage/async-storage';

const keys = ['ACCESS_TOKEN', 'SELECTED_LANGUAGE', 'CURRENT_USER'] as const;

type Key = (typeof keys)[number];

export const setData = async (key: Key, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (key: Key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value !== null ? value : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeData = async (key: Key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
