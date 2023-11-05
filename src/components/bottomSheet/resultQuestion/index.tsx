import BottomSheet from "@gorhom/bottom-sheet";
import clock from "assets/images/clock.json";
import correct from "assets/images/correct.json";
import wrong from "assets/images/wrong.json";
import LottieView from "lottie-react-native";
import React, { useMemo, forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BigButton from "@/components/button";

interface ResultQuestionBottomSheetProps {
  resultBS: "TIME_UP" | "CORRECT" | "WRONG" | null;
  goToNextQuestion: () => void;
  isLastQuestion: boolean;
}

const ResultQuestionBottomSheet = forwardRef<
  BottomSheet,
  ResultQuestionBottomSheetProps
>((props, ref) => {
  // props
  const { resultBS, isLastQuestion, goToNextQuestion, ...rest } = props;
  const animation =
    resultBS === "TIME_UP" ? clock : resultBS === "CORRECT" ? correct : wrong;

  const description =
    resultBS === "TIME_UP"
      ? "Süre doldu!"
      : resultBS === "CORRECT"
      ? "Doğru cevap!"
      : "Yanlış cevap!";

  // variables
  const snapPoints = useMemo(() => ["50%"], []);
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet
      enableContentPanningGesture
      index={-1}
      ref={ref}
      snapPoints={snapPoints}
      {...rest}
    >
      <View style={[styles.contentContainer, { paddingBottom: insets.bottom }]}>
        <LottieView
          source={animation}
          autoPlay
          loop={false}
          style={{ height: 100, width: 200 }}
        />
        <Text style={styles.description}>{description}</Text>
        <BigButton
          onPress={() => {
            goToNextQuestion();
          }}
          style={styles.nextButton}
        >
          {isLastQuestion ? "Ana sayfa" : "Yeni soru yolla"}
        </BigButton>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center",
  },
  nextButton: {
    marginTop: "auto",
    width: "100%",
    marginBottom: 20,
  },
});

export default ResultQuestionBottomSheet;
