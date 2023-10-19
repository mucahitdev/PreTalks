import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

import { BigButton } from "@/components";

interface QuestionAreaProps {
  currentQuestion: any;
  handleAnswerSelection: (answer: boolean) => void;
}

const QuestionArea: FC<QuestionAreaProps> = ({
  currentQuestion,
  handleAnswerSelection,
}) => {
  return (
    <>
      <View style={styles.questionContainer}>
        <Text style={styles.questionWord}> {currentQuestion.word} </Text>
        <Text style={styles.questionDescription}>
          kelimesinin anlamı nedir?
        </Text>
      </View>
      {currentQuestion.answers.map((item: any, index: number) => (
        <BigButton
          key={index}
          labelStyle={styles.answerText}
          style={styles.answerTextContainer}
          onPress={() => handleAnswerSelection(item.isCorrect)} // item.isCorrect doğru ise true, yanlış ise false dönecektir.
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D0D4CA",
    width: "100%",
    borderRadius: 16,
  },
  questionWord: {
    fontSize: 48,
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
});

export default QuestionArea;
