import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import id from "./locales/id.json";
import en from "./locales/en.json";

const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;

i18n.use(initReactI18next).init({
  resources: { id: { translation: id }, en: { translation: en } },
  lng: stored || "id",
  fallbackLng: "id",
  interpolation: { escapeValue: false },
  returnNull: false,
  // Initialize synchronously so i18n.isInitialized is true before the first
  // (SSR/initial) render. Otherwise t() runs before resources are ready and
  // returns the raw key (e.g. "nav.dashboard"), which is what showed the
  // "nav." prefix until the language was toggled.
  initImmediate: false,
  parseMissingKeyHandler: (key) => {
    // Never show raw translation keys to users — fall back to the last segment as a label.
    const seg = key.split(".").pop() || key;
    return seg.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim();
  },
});

export function setLanguage(lang: "id" | "en") {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") localStorage.setItem("lang", lang);
}

export default i18n;