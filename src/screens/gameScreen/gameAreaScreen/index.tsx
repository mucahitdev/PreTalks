import BottomSheet from "@gorhom/bottom-sheet";
import * as NavigationBar from "expo-navigation-bar";
import { FC, useEffect, useRef, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/common/theme";
import { BigButton } from "@/components";
import ResultQuestionBottomSheet from "@/components/bottomSheet/resultQuestion";

interface GameAreaScreenProps {
  navigation?: any;
  route?: any;
}

const GameAreaScreen: FC<GameAreaScreenProps> = ({ navigation }) => {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(theme.colors.primary);
    }
  }, []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const hasUnsavedChanges = true;

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e: any) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert("Geri dön", "Oyunu bitirmek istediğinize emin misiniz?", [
          { text: "Kal", style: "cancel", onPress: () => {} },
          {
            text: "Evet",
            style: "destructive",

            onPress: () => navigation.dispatch(e.data.action),
          },
        ]);
      }),
    [navigation, hasUnsavedChanges],
  );

  const question = {
    question: "Big kelimesinin anlamı nedir?",
    answers: [
      {
        answer: "Büyük",
        isCorrect: true,
      },
      {
        answer: "Küçük",
        isCorrect: false,
      },
      {
        answer: "Orta",
        isCorrect: false,
      },
      {
        answer: "Kısa",
        isCorrect: false,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameInfoContainer}>
        <Text>Kelime Avı</Text>
        <CircularProgress
          value={0}
          duration={15000}
          maxValue={15}
          initialValue={15}
          radius={28}
          onAnimationComplete={() => console.log("onAnimationComplete")}
        />
      </View>
      <View style={styles.questionContainer}>
        <Text>Big</Text>
        <Text>Kelimesinin anlamı nedir?</Text>
      </View>
      {question.answers.map((item, index) => (
        <BigButton
          key={index}
          labelStyle={styles.answerText}
          style={styles.answerTextContainer}
          onPress={() => {
            openBottomSheet();
            console.log(item.answer);
          }}
        >
          {item.answer}
        </BigButton>
      ))}
      <ResultQuestionBottomSheet ref={bottomSheetRef} />
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
  gameInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 80,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "100%",
    borderRadius: 16,
  },
  answerTextContainer: {
    height: 56,
    width: "100%",
    marginTop: 16,
    backgroundColor: "pink",
  },
  answerText: {
    fontSize: 20,
    color: "#FF4B91",
  },
});

export default GameAreaScreen;
