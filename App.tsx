import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";

import Fonts from "@/common/fonts";
import { theme } from "@/common/theme";

export default function App() {
  const [fontsLoaded] = useFonts(Fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Open up App.tsx to start working on your app !!!!
        </Text>
        <Button mode="text" onPress={() => console.log("Pressed")}>
          Press me
        </Button>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {},
});
