import BottomSheet from "@gorhom/bottom-sheet";
import { FC, useRef, useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import { SafeAreaView } from "react-native-safe-area-context";

import QuestionArea from "./questionArea";

import { APP_NAV, TAB_BAR_NAV } from "@/common/constants";
// import MockWords from "@/common/data/questions/index.json";
import words from "@/common/data/allWords";
// import { newQuestions } from "@/common/data/questions/newQuestions";
import { theme } from "@/common/theme";
import ResultQuestionBottomSheet from "@/components/bottomSheet/resultQuestion";
import { generateQuestions } from "@/helpers";
import { useBackEnabled, useSoundPlayer } from "@/hooks";

interface GameAreaScreenProps {
  navigation?: any;
  route?: any;
}

type ResultBSTypes = "TIME_UP" | "CORRECT" | "WRONG" | null;

const GameAreaScreen: FC<GameAreaScreenProps> = ({ navigation }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [resultBS, setResultBS] = useState<ResultBSTypes>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const circleRef = useRef<ProgressRef>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);

  // Hooks
  useBackEnabled(navigation, isLastQuestion);
  const { playSound, stopSound } = useSoundPlayer();

  useEffect(() => {
    if (questions.length === 0) {
      const _newQuestions = generateQuestions(words);
      setQuestions(_newQuestions);
    }
  }, []);

  // Functions

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  if (questions.length === 0) {
    return null;
  }

  const onAnimationComplete = () => {
    playSound("TIME_UP");
    setResultBS("TIME_UP");
    openBottomSheet();
  };

  const resetAnimation = () => {
    circleRef.current?.reAnimate();
  };

  const pauseAnimation = () => {
    circleRef.current?.pause();
  };

  const handleAnswerSelection = (answer: boolean) => {
    if (answer) {
      playSound("CORRECT");
      setResultBS("CORRECT");
      setScore((prevScore) => prevScore + 10);
      pauseAnimation();
    } else {
      playSound("WRONG");
      setResultBS("WRONG");
      pauseAnimation();
    }
    openBottomSheet();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      closeBottomSheet();
      resetAnimation();
      stopSound("TIME_UP");
      if (currentQuestionIndex === questions.length - 2) {
        setIsLastQuestion(true);
      }
    } else {
      navigation.navigate(APP_NAV.TAB_STACK, {
        screen: TAB_BAR_NAV.HOME,
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameInfoContainer}>
        <View style={styles.gameInfos}>
          <Text style={styles.gameInfoText}>Puan: {score}</Text>
          <Text style={styles.gameInfoText}>
            Soru: {currentQuestionIndex + 1}
          </Text>
        </View>
        <Text style={styles.gameModeText}>Kelime Avı</Text>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <CircularProgress
            ref={circleRef}
            value={0}
            duration={15000}
            maxValue={15}
            initialValue={15}
            radius={28}
            startInPausedState={false}
            onAnimationComplete={onAnimationComplete}
          />
        </View>
      </View>

      <QuestionArea
        currentQuestion={currentQuestion}
        handleAnswerSelection={handleAnswerSelection}
      />

      <ResultQuestionBottomSheet
        resultBS={resultBS}
        ref={bottomSheetRef}
        isLastQuestion={isLastQuestion}
        currentQuestion={currentQuestion}
        goToNextQuestion={goToNextQuestion}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    padding: 16,
  },
  gameInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 80,
  },
  gameModeText: {
    color: "white",
    fontSize: 24,
  },
  gameInfos: {
    flex: 1,
  },
  gameInfoText: {
    color: theme.colors.highlightBackground,
    fontSize: 16,
  },
});

export default GameAreaScreen;
