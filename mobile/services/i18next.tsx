import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import hu from '../locales/hu.json';
import ro from '../locales/ro.json';

export const languageResources = {
  en: { translation: en },
  hu: { translation: hu },
  ro: { translation: ro },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});

export { i18next };
