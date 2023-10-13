import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

import Fonts from "@/common/fonts";
import { theme } from "@/common/theme";
import AppNavigations from "@/navigations/appNavigations";

export default function App() {
  const [fontsLoaded] = useFonts(Fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AppNavigations />
      </NavigationContainer>
    </PaperProvider>
  );
}
