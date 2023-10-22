export default function generateQuestions(data: any) {
  const questions = data.map((word: any) => {
    // Doğru cevap
    const correctAnswer = {
      answer: word.translations.tr,
      isCorrect: true,
    };

    // Yanlış cevaplar için rastgele kelimeler seç
    const otherWords = data.filter((w: any) => w.word !== word.word);
    const randomWords = shuffleArray(otherWords).slice(0, 3);

    // Yanlış cevapları topla
    const wrongAnswers = randomWords.map((w) => ({
      answer: w.translations.tr,
      isCorrect: false,
    }));

    // Tüm cevapları bir araya getir ve karıştır
    const allAnswers = shuffleArray([correctAnswer, ...wrongAnswers]);

    return {
      word: word.word,
      correctAnswer: correctAnswer.answer,
      answers: allAnswers,
      levelId: word.levelId,
    };
  });

  return questions;
}

function shuffleArray(array: any) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
