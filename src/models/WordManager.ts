// src/models/WordManager.ts

import { categoryNames, WordType } from '@/common/data/allWords';
import { type Category } from '@/store/settingsStore';

export class WordManager {
  private words: WordType[];
  private groupedWords: { [key: number]: WordType[] };

  constructor(words: WordType[]) {
    this.words = words;
    this.groupedWords = this.groupWordsByCategory();
  }

  private groupWordsByCategory() {
    return this.words.reduce(
      (acc, word) => {
        if (!acc[word.category]) {
          acc[word.category] = [];
        }
        acc[word.category].push(word);
        return acc;
      },
      {} as { [key: number]: WordType[] }
    );
  }

  getWordByIds(ids: number[]): WordType[] {
    return this.words.filter((word) => ids.includes(word.id));
  }

  getWordsByCategory(categoryId: number): WordType[] {
    return this.groupedWords[categoryId] || [];
  }

  getWordCountByCategory(
    selectedCategories: Category[] = []
  ): { categoryId: number; count: number; name: string }[] {
    return selectedCategories.map((category) => {
      const categoryId = Number(category.id); // category.id string olduğu için doğrudan kullanabiliriz
      const wordCount = this.groupedWords[categoryId] ? this.groupedWords[categoryId].length : 0;
      return {
        categoryId, // categoryId'yi sayıya çevir
        count: wordCount,
        name: categoryNames[categoryId] || 'Bilinmeyen Kategori',
      };
    });
  }

  getAllWords(): WordType[] {
    return this.words;
  }
}
