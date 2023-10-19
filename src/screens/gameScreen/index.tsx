import LottieView from "lottie-react-native";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GAME_NAV } from "@/common/constants";
import { theme } from "@/common/theme";
import { BigButton } from "@/components";
import { useSetAndroidNavBarColor } from "@/hooks";

interface GameScreenProps {
  navigation?: any;
  route?: any;
}

const GameScreen: FC<GameScreenProps> = ({ route, navigation }) => {
  const { data } = route.params;

  useSetAndroidNavBarColor(theme.colors.primary);

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
        onPress={() => navigation.navigate(GAME_NAV.GAME_AREA)}
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
