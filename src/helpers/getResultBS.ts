import clock from "assets/images/clock.json";
import correct from "assets/images/correct.json";
import wrong from "assets/images/wrong.json";

interface ResultBS {
  resultBS: "TIME_UP" | "CORRECT" | "WRONG" | null;
}

export default function getResultBS({ resultBS }: ResultBS) {
  let animation;
  let description;

  switch (resultBS) {
    case "TIME_UP":
      animation = clock;
      description = "Süre doldu!";
      break;
    case "CORRECT":
      animation = correct;
      description = "Doğru cevap!";
      break;
    case "WRONG":
      animation = wrong;
      description = "Yanlış cevap!";
      break;
    default:
      animation = wrong;
      description = "Yanlış cevap!";
      break;
  }
  return { animation, description };
}
