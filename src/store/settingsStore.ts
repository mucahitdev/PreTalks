import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { categoryNames } from '@/common/data/allWords';

export type Language = 'en' | 'tr';

export interface Category {
  id: string;
  selected: boolean;
}

interface SettingsState {
  hasCompletedOnboarding: boolean;
  selectedLanguage: Language;
  categories: Category[];
  setHasCompletedOnboarding: (completed: boolean) => void;
  setSelectedLanguage: (language: Language) => void;
  toggleCategory: (categoryId: string) => void;
}

const defaultCategories = Object.keys(categoryNames).map((id) => ({
  id,
  selected: false,
}));
// Get initial language based on device locale
const getInitialLanguage = (): Language => {
  const deviceLocale = Localization.locale.split('-')[0]; // Get primary language code
  const supportedLanguages: Language[] = ['en', 'tr'];

  return supportedLanguages.includes(deviceLocale as Language) ? (deviceLocale as Language) : 'en';
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      selectedLanguage: getInitialLanguage(),
      categories: defaultCategories,
      setHasCompletedOnboarding: (completed) => set({ hasCompletedOnboarding: completed }),
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      toggleCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
          ),
        })),
    }),
    {
      name: 'settingr12-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
