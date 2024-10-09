import { setData, getData, removeData } from './asyncStorage';

const SELECTED_LANGUAGE = 'SELECTED_LANGUAGE';

export const saveLanguage = async (language: string) => {
  await setData(SELECTED_LANGUAGE, language);
};

export const loadLanguage = async () => {
  const language = await getData(SELECTED_LANGUAGE);
  return language !== null ? language : 'en';
};

export const removeLanguage = async () => {
  await removeData(SELECTED_LANGUAGE);
};
