import * as Speech from "expo-speech";
import { useEffect } from "react";

interface SpeakProps {
  text: string;
  language?: string;
  enable?: boolean;
}

const useSpeech = ({ text, language = "en", enable = true }: SpeakProps) => {
  const speak = () => {
    const thingToSay = text;
    Speech.speak(thingToSay, {
      language,
    });
  };
  useEffect(() => {
    if (enable) speak();
    return () => {
      Speech.stop();
    };
  }, [text]);
};

export default useSpeech;
