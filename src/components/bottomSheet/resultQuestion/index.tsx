import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";

import { theme } from "@/common/theme";

interface ResultQuestionBottomSheetProps extends BottomSheet {}

const ResultQuestionBottomSheet = forwardRef<ResultQuestionBottomSheetProps>(
  (props, ref) => {
    // props
    const { ...rest } = props;

    // variables
    const snapPoints = useMemo(() => ["50%"], []);

    return (
      <BottomSheet index={-1} ref={ref} snapPoints={snapPoints} {...rest}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ResultQuestionBottomSheet;
