import * as NavigationBar from "expo-navigation-bar";
import LottieView from "lottie-react-native";
import { FC, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/common/theme";
import { BigButton } from "@/components";

interface GameScreenProps {
  navigation?: any;
  route?: any;
}

const GameScreen: FC<GameScreenProps> = ({ route }) => {
  const { data } = route.params;

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(theme.colors.primary);
    }
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={data.animation}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.name} oyununa hoşgeldiniz.</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <BigButton
        style={styles.button}
        onPress={() => {
          console.log("Go back");
        }}
      >
        Oyunu Başlat
      </BigButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  textContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "auto",
  },
  title: {
    fontSize: 20,
    color: "#FF4B91",
    marginTop: 32,
  },
  description: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    textAlign: "center",
    color: "white",
    marginTop: 16,
  },
  button: {
    width: "100%",
    marginTop: 32,
    backgroundColor: "#FF4B91",
    marginBottom: 100,
  },
});

export default GameScreen;
