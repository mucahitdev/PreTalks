import { Audio } from "expo-av";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { SoundPlayerHook, SoundNames } from "@/common/types/soundHookTypes";
import { selectIsSoundEffectOn } from "@/store/settingsReducer";

const sounds: Record<SoundNames, number> = {
  CORRECT: require("assets/sounds/correct.mp3"),
  TIME_UP: require("assets/sounds/time_up.mp3"),
  WRONG: require("assets/sounds/wrong.mp3"),
};

const useSoundPlayer = (): SoundPlayerHook => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const isSoundEfectOn = useSelector(selectIsSoundEffectOn);

  const playSound = async (soundName: SoundNames) => {
    if (!isSoundEfectOn) return;
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      sounds[soundName],
    );
    setSound(newSound);
    await newSound.playAsync();
  };

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const stopSound = async () => {
    if (!isSoundEfectOn) return;
    if (sound) {
      await sound.unloadAsync();
    }
  };
  return {
    playSound,
    stopSound,
  };
};

export default useSoundPlayer;
