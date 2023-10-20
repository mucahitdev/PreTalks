interface LevelDetail {
  text: string;
  color: string;
}

const LEVELS: Record<number, LevelDetail> = {
  1: { text: "A1", color: "yellow" },
  2: { text: "A2", color: "yellow" },
  3: { text: "B1", color: "purple" },
  4: { text: "B2", color: "purple" },
  5: { text: "C1", color: "blue" },
  6: { text: "C2", color: "green" },
};

export default function getLevelTextAndColor(levelId: number): LevelDetail {
  return LEVELS[levelId] || { text: "A1", color: "yellow" };
}
