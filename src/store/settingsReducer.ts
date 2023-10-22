import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

export default settingsSlice.reducer;
