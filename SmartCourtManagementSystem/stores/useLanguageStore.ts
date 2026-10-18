import { create } from 'zustand';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface LanguageState {
  language: Language;
  t: typeof translations['vi'];
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'vi',
  t: translations.vi,

  setLanguage: (lang: Language) => {
    set({
      language: lang,
      t: translations[lang],
    });
  },

  toggleLanguage: () => {
    set((state) => {
      const nextLang = state.language === 'vi' ? 'en' : 'vi';
      return {
        language: nextLang,
        t: translations[nextLang],
      };
    });
  },
}));
