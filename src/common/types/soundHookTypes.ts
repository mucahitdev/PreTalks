export type SoundNames = "CORRECT" | "TIME_UP" | "WRONG";

export interface SoundPlayerHook {
  playSound: (soundName: SoundNames) => Promise<void>;
  stopSound: (soundName: SoundNames) => Promise<void>;
}
