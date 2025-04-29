import allWords from './words.json';

enum PartOfSpeech {
  IndefiniteArticle = 1,
  Verb = 2,
  Noun = 3,
  Adjective = 4,
  Adverb = 5,
  Preposition = 6,
  Conjunction = 7,
  Exclamation = 8,
  Determiner = 9,
  Pronoun = 10,
  AuxiliaryVerb = 11,
  Number = 12,
  ModalVerb = 13,
  OrdinalNumber = 14,
  LinkingVerb = 15,
  DefiniteArticle = 16,
  InfinitiveMarker = 17,
}

enum Level {
  A1 = 1,
  A2 = 2,
  B1 = 3,
  B2 = 4,
  C1 = 5,
}

type Translations = {
  [languageCode: string]: {
    first: string;
    related: string[];
  };
};

interface CategoryNames {
  [key: string]: string;
}

export const categoryNames: CategoryNames = {
  1: 'Seyahat',
  2: 'Alışveriş',
  3: 'Aile ve Arkadaşlar',
  4: 'Okul ve Eğitim',
  5: 'İş',
  6: 'İletişim',
  7: 'Hisler ve Duygular',
  8: 'Dışarda Yemek',
  9: 'Yeme İçme',
  10: 'Sağlık ve Tıp',
  11: 'Ev ve Yaşam',
  12: 'Şehirde Yaşam',
  13: 'Giysi ve Aksesuar',
  14: 'Sinama ve Tiyatro',
  15: 'Teknoloji',
  16: 'Medya',
  17: 'Hava İklim',
  18: 'Hayvanlar',
  19: 'Coğrafya',
  20: 'Araç ve Taşıtlar',
  21: 'Spor',
  22: 'Bitkiler',
  23: 'Genel Fiiller',
  24: 'Genel İsimler',
  25: 'Genel Sıfatlar',
  26: 'Genel Zamanlar',
};

export type WordType = {
  id: number;
  word: string;
  link: string;
  partOfSpeech: PartOfSpeech;
  ukAudio: string;
  usAudio: string;
  translations: Translations;
  level: Level;
  is3000: boolean;
  category: number;
};

const words: WordType[] = JSON.parse(JSON.stringify(allWords));

export default words;
