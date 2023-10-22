import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";

export interface SettingsState {
  sections: Section[];
  isOnboardingCompleted: boolean;
}

type SectionData = {
  id: number;
  title: string;
  value: boolean;
  type: number;
  sectionId: number;
};

type Section = {
  id: number;
  title: string;
  data: SectionData[];
};

const initialState: SettingsState = {
  isOnboardingCompleted: false,
  sections: [
    {
      id: 1,
      title: "Ses",
      data: [
        {
          id: 1,
          title: "Ses efektleri",
          value: true,
          type: 1,
          sectionId: 1,
        },
        {
          id: 2,
          title: "Kelime okunuşu",
          value: true,
          type: 1,
          sectionId: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Bildirimler",
      data: [
        {
          id: 1,
          title: "Hatırlatıcılar",
          value: false,
          type: 1,
          sectionId: 2,
        },
      ],
    },
  ],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSetting: (state, action: PayloadAction<Section[]>) => {
      state.sections = action.payload;
    },
    setOnboardingCompleted: (state) => {
      state.isOnboardingCompleted = true;
    },
  },
});

export const { toggleSetting, setOnboardingCompleted } = settingsSlice.actions;

export const selectIsSoundEffectOn = (state: RootState) => {
  return state.settings.sections[0].data[0].value;
};
export const selectIsWordReadingOn = (state: RootState) => {
  return state.settings.sections[0].data[1].value;
};
export const selectIsReminderOn = (state: RootState) => {
  return state.settings.sections[1].data[0].value;
};

export default settingsSlice.reducer;
