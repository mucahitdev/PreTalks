export const APP_NAV = {
  ONBOARDING: "OnBoardingScreen",
  TAB_STACK: "TabStack",
  GAME_STACK: "GameStack",
};

export const TAB_BAR_NAV = {
  HOME: "HomeScreen",
  SETTINGS: "SettingsScreen",
};

export const GAME_NAV = {
  GAME: "GameScreen",
  GAME_RESULT: "GameResultScreen",
};

export type APP_NAV_TYPE = keyof typeof APP_NAV;
export type TAB_BAR_NAV_TYPE = keyof typeof TAB_BAR_NAV;
export type GAME_NAV_TYPE = keyof typeof GAME_NAV;
