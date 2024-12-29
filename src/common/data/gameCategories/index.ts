import WordHunt from 'assets/images/word-hunt.json';

export const gameCategories = [
  {
    id: 1,
    name: 'Quiz',
    categoryID: 1,
    animation: WordHunt,
    enabled: true,
    description: 'Bu oyunda verilen kelimelerin anlamlarını bulmaya çalışacaksınız.',
  },
  {
    id: 2,
    name: 'Quiz Zamana Karşı',
    categoryID: 2,
    animation: WordHunt,
    enabled: false,
    description:
      'Bu oyunda verilen kelimelirin anlamlarını zaman tükenmeden bulmaya çalışın. Her doğru cevap için +5sn kazanırsınız.',
  },
];
