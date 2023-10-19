import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";

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

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  return (
    <BottomSheet
      enableContentPanningGesture
      index={-1}
      ref={ref}
      snapPoints={snapPoints}
      {...rest}
    >
      <View style={styles.contentContainer}>
        <Text>{resultBS}</Text>
        <BigButton
          onPress={() => {
            goToNextQuestion();
          }}
          style={{ height: 56, width: "100%" }}
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
});

export default ResultQuestionBottomSheet;
