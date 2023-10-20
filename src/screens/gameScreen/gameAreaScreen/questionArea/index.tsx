import { Ionicons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { theme } from "@/common/theme";
import { BigButton } from "@/components";
import { useSpeech } from "@/hooks";

interface QuestionAreaProps {
  currentQuestion: any;
  handleAnswerSelection: (answer: boolean) => void;
}

const QuestionArea: FC<QuestionAreaProps> = ({
  currentQuestion,
  handleAnswerSelection,
}) => {
  const [isMute, setIsMute] = useState(false);
  useSpeech({ text: currentQuestion.word, enable: !isMute });

  return (
    <>
      <View style={styles.questionContainer}>
        <Text style={styles.questionWord}> {currentQuestion.word} </Text>
        <Text style={styles.questionDescription}>
          kelimesinin anlamı nedir?
        </Text>
        <TouchableOpacity
          style={styles.mute}
          onPress={() => setIsMute(!isMute)}
        >
          {isMute ? (
            <Ionicons
              name="ios-volume-off"
              size={30}
              color={theme.colors.primary}
            />
          ) : (
            <Ionicons
              name="ios-volume-medium"
              size={30}
              color={theme.colors.primary}
            />
          )}
        </TouchableOpacity>
      </View>
      {currentQuestion.answers.map((item: any, index: number) => (
        <BigButton
          key={index}
          labelStyle={styles.answerText}
          style={styles.answerTextContainer}
          onPress={() => handleAnswerSelection(item.isCorrect)}
        >
          {item.answer}
        </BigButton>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D0D4CA",
    justifyContent: "center",
    width: "100%",
    borderRadius: 16,
  },
  questionWord: {
    fontSize: 36,
    color: "#FF4B91",
  },
  questionDescription: {
    fontSize: 20,
    color: "white",
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
  mute: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
    padding: 8,
  },
});

export default QuestionArea;
