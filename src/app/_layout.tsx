import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LogViewer, overrideConsole } from 'react-native-console-modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Fonts from '@/common/fonts';
import { WordsProvider } from '@/context/WordsContext';
import { useSettingsStore } from '@/store/settingsStore';

SplashScreen.preventAutoHideAsync();
overrideConsole();

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts(Fonts);
  const router = useRouter();
  const onboardingCompleted = useSettingsStore((state) => state.hasCompletedOnboarding);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      if (!onboardingCompleted) {
        router.replace('/onboarding');
      }
    }
  }, [loaded, onboardingCompleted]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WordsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(noTabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(game)/game-area" options={{ headerShown: false }} />
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack>
      </WordsProvider>
      <LogViewer />
    </GestureHandlerRootView>
  );
}
