import React, { createContext, useState, useContext, useEffect } from 'react';

import { WordManager } from '../models/WordManager';

import { WordType } from '@/common/data/allWords';

// Context tipini tanımlıyoruz
interface WordsContextType {
  wordManager: WordManager | null;
}

const WordsContext = createContext<WordsContextType | undefined>(undefined);

interface WordsProviderProps {
  children: React.ReactNode;
}

export const WordsProvider: React.FC<WordsProviderProps> = ({ children }) => {
  const [wordManager, setWordManager] = useState<WordManager | null>(null);

  useEffect(() => {
    const words: WordType[] = require('../common/data/allWords').default;
    const manager = new WordManager(words);
    setWordManager(manager);
  }, []);

  return <WordsContext.Provider value={{ wordManager }}>{children}</WordsContext.Provider>;
};

export const useWords = (): WordsContextType => {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error('useWords must be used within a WordsProvider');
  }
  return context;
};
