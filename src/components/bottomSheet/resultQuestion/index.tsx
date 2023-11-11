import { Entypo } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Flag_sh, Flag_tr } from "assets/index";
import LottieView from "lottie-react-native";
import React, { forwardRef, useState } from "react";
import { Text, StyleSheet, View, Pressable, FlatList } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "@/common/theme";
import BigButton from "@/components/button";
import getResultBS from "@/helpers/getResultBS";

interface ResultQuestionBottomSheetProps {
  resultBS: "TIME_UP" | "CORRECT" | "WRONG" | null;
  goToNextQuestion: () => void;
  isLastQuestion: boolean;
  currentQuestion: any;
}
const AnimatedIcon = Animated.createAnimatedComponent(Entypo);

const ResultQuestionBottomSheet = forwardRef<
  BottomSheet,
  ResultQuestionBottomSheetProps
>((props, ref) => {
  // props
  const {
    resultBS,
    isLastQuestion,
    currentQuestion,
    goToNextQuestion,
    ...rest
  } = props;
  const { animation, description } = getResultBS({ resultBS });
  const { word, correctAnswer, translations } = currentQuestion;
  const insets = useSafeAreaInsets();
  const lang = "tr";

  const [expand, setExpand] = useState(false);

  const relateds = translations[lang].related;

  const expandAnimationStyle = useAnimatedStyle(() => {
    return {
      height: expand ? withTiming(100) : withTiming(50),
    };
  });

  const expandContainerAnimationStyle = useAnimatedStyle(() => {
    return {
      height: expand ? withTiming(150) : withTiming(100),
    };
  });

  const expandBlankViewAnimationStyle = useAnimatedStyle(() => {
    return {
      height: expand ? withTiming(0) : withTiming(50),
    };
  });

  const expandIconAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: expand ? withTiming("90deg") : withTiming("0deg"),
        },
      ],
    };
  });

  const handleButtonPress = () => {
    goToNextQuestion();
    setExpand(false);
  };
  return (
    <BottomSheet
      enableContentPanningGesture={false}
      enablePanDownToClose
      enableHandlePanningGesture={false}
      enableOverDrag={false}
      snapPoints={["10%"]}
      index={-1}
      ref={ref}
      enableDynamicSizing
      {...rest}
    >
      <BottomSheetView
        style={[styles.contentContainer, { paddingBottom: insets.bottom }]}
      >
        <LottieView
          source={animation}
          autoPlay
          loop={false}
          style={{ height: 100, width: 200 }}
        />
        <Text style={styles.description}>{description}</Text>
        <Animated.View
          style={[styles.wordInfoContainer, expandContainerAnimationStyle]}
        >
          <Animated.View style={[styles.expandContainer, expandAnimationStyle]}>
            <Pressable
              onPress={() => {
                setExpand((prev) => !prev);
              }}
              style={styles.wordContainer}
            >
              <View style={styles.flagBox}>
                <Flag_sh />
              </View>
              <Text style={styles.word}>{word}</Text>
              <AnimatedIcon
                style={[styles.icon, expandIconAnimationStyle]}
                name="chevron-right"
                size={24}
                color="black"
              />
            </Pressable>
            <FlatList
              data={relateds}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={styles.relatedBox}>
                  <Text style={styles.relatedText}>{item}</Text>
                </View>
              )}
            />
          </Animated.View>
          <View style={styles.wordContainer}>
            <View style={styles.flagBox}>
              <Flag_tr />
            </View>
            <Text style={styles.word}>{correctAnswer}</Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.blankView, expandBlankViewAnimationStyle]}
        />
        <BigButton onPress={handleButtonPress} style={styles.nextButton}>
          {isLastQuestion ? "Sonuçları Gör" : "Yeni soru yolla"}
        </BigButton>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  wordInfoContainer: {
    width: "100%",
    backgroundColor: theme.colors.secondaryContainer,
    height: 100,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  icon: {
    transform: [{ rotate: "0deg" }],
    marginLeft: "auto",
  },
  blankView: {
    height: 50,
  },
  relatedBox: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  relatedText: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  wordContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    gap: 10,
  },
  expandContainer: {
    height: 150,
  },
  flagBox: {
    borderRadius: 50,
    overflow: "hidden",
  },
  word: {
    fontSize: 20,
  },
  description: {
    fontSize: 20,
    textAlign: "center",
  },
  nextButton: {
    width: "100%",
    marginBottom: 20,
  },
});

export default ResultQuestionBottomSheet;
