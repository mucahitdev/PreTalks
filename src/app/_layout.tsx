import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import Fonts from '@/common/fonts';
import { useSettingsStore } from '@/store/settingsStore';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts(Fonts);
  const router = useRouter();
  const onboardingComlated = useSettingsStore((state) => state.hasCompletedOnboarding);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      if (!onboardingComlated) {
        router.replace('/onboarding');
      }
    }
  }, [loaded, onboardingComlated]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
