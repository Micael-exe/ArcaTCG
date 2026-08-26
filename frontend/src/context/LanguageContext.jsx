import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { translations, LANGUAGES } from "../i18n/translations";

const STORAGE_KEY = "arcatcg_lang";
const DEFAULT_LANG = "pt";

const LanguageContext = createContext(null);

function getInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && translations[saved]) return saved;
  // Fall back to the browser's language if we support it, otherwise pt.
  const browserLang = (navigator.language || "").slice(0, 2);
  if (translations[browserLang]) return browserLang;
  return DEFAULT_LANG;
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  }, [language]);

  const setLanguage = useCallback((code) => {
    if (!translations[code]) return;
    setLanguageState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  }, []);

  // Looks up a dotted key path, e.g. t("categories.title"), falling
  // back to the key itself if missing so a typo shows up visibly
  // instead of silently rendering blank text.
  const t = useCallback(
    (path) => {
      const dict = translations[language] || translations[DEFAULT_LANG];
      const value = path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
      if (value !== undefined) return value;
      const fallback = path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), translations[DEFAULT_LANG]);
      return fallback !== undefined ? fallback : path;
    },
    [language]
  );

  // Translates known recurring mock-data labels (CTA text, tags,
  // badge statuses) that are stored in Portuguese inside mock.js.
  // Falls back to the original string when there's no mapping, so
  // real product names pass through untouched.
  const tc = useCallback(
    (text) => {
      const dict = translations[language] || translations[DEFAULT_LANG];
      return dict.content?.[text] ?? text;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, tc, languages: LANGUAGES }),
    [language, setLanguage, t, tc]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
