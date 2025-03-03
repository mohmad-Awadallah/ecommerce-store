import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import he from './locales/he.json';  // تأكد من استيراد ملف الترجمة للعبرية
import en from './locales/en.json';


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    he: { translation: he },
  },
  lng: 'ar', // اللغة الافتراضية
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});


export default i18n;
