import allWords from "./words.json";

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
};

const words: WordType[] = JSON.parse(JSON.stringify(allWords));

export default words;
