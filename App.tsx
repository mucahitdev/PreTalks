import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";

import Fonts from "@/common/fonts";
import { theme } from "@/common/theme";
import { BigButton, Spacer } from "@/components";

export default function App() {
  const [fontsLoaded] = useFonts(Fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <BigButton icon="camera" onPress={() => console.log("hello")}>
            Haloo
          </BigButton>
          <Spacer space={4} />
          <BigButton mode="text" icon="camera" onPress={() => console.log("hello")}>
            Haloo
          </BigButton>
        </View>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {},
});
