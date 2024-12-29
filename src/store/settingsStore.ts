import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Language = 'en' | 'tr';

export interface Category {
  id: string;
  name: string;
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

const defaultCategories = [
  { id: '1', name: 'Software Development', selected: false },
  { id: '2', name: 'Design', selected: false },
  { id: '3', name: 'Business', selected: false },
  { id: '4', name: 'Marketing', selected: false },
  { id: '5', name: 'Education', selected: false },
  { id: '6', name: 'Healthcare', selected: false },
];

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
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
