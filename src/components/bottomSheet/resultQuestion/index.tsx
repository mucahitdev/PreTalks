import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import React, { useMemo, forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BigButton from "@/components/button";
import getResultBS from "@/helpers/getResultBS";

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
  const { animation, description } = getResultBS({ resultBS });

  // variables
  const initialSnapPoints = useMemo(() => ["25%", "CONTENT_HEIGHT"], []);
  const insets = useSafeAreaInsets();

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  return (
    <BottomSheet
      enableContentPanningGesture={false}
      enablePanDownToClose
      enableHandlePanningGesture={false}
      enableOverDrag={false}
      index={-1}
      ref={ref}
      enableDynamicSizing
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      {...rest}
    >
      <BottomSheetView
        onLayout={handleContentLayout}
        style={[styles.contentContainer, { paddingBottom: insets.bottom }]}
      >
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
          {isLastQuestion ? "Sonuçları Gör" : "Yeni soru yolla"}
        </BigButton>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
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
