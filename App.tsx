import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import Customizer from "react-native-reset-css";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Fonts from "@/common/fonts";
import { theme } from "@/common/theme";
import AppNavigations from "@/navigations/appNavigations";

export default function App() {
  const [fontsLoaded] = useFonts(Fonts);

  if (!fontsLoaded) {
    return null;
  }

  Customizer.Text({
    style: {
      fontFamily: theme.fonts.bold,
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
            <AppNavigations />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
