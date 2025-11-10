import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANGUAGES = {
  en: {},
  es: {},
};

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  fallbackLng: "en",
  defaultNS: "translation",
  ns: ["translation"],
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  }
});

export default i18n;
