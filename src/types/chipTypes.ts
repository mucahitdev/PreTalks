import { Language } from '@/store/settingsStore';

export interface AnimatedLanguageChipProps {
  code: Language;
  label: string;
  selected: boolean;
  onSelect: (code: Language) => void;
}
