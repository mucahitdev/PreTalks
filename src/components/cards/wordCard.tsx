import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { type WordType } from "@/common/data/allWords";

const WordCard: FC<WordType> = ({ word, translations, ukAudio, usAudio }) => {
  const languageCode = "tr";
  const firstTranslation = translations[languageCode].first;
  const relatedTranslations = translations[languageCode].related;

  const handlePlayLocalSound = () => {
    Speech.speak(word, {
      language: "en",
    });
  };

  const handlePlayAsyncSound = (isUK: boolean) => {
    const sound = new Audio.Sound();

    const audioUrl = isUK ? ukAudio : usAudio;

    const playSound = async () => {
      try {
        await sound.loadAsync({ uri: process.env.AUDIO_BASE_URL + audioUrl });
        await sound.playAsync();
      } catch (error) {
        console.log("🚀 ~ playSound ~ error", error);
      }
    };

    playSound();
  };
  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <Text style={styles.word}>{word}</Text>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity onPress={handlePlayLocalSound}>
            <FontAwesome name="volume-up" size={26} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePlayAsyncSound(true)}>
            <FontAwesome name="volume-up" size={26} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePlayAsyncSound(false)}>
            <FontAwesome name="volume-up" size={26} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Text style={styles.trans}>{firstTranslation}</Text>
        {relatedTranslations.map((related, index) => (
          <Text key={index} style={styles.relatedTrans}>
            {index === 0 ? " - " : ", "}
            {related}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  firstSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  word: {
    color: "#000",
    fontSize: 20,
    lineHeight: 24,
  },
  trans: {
    color: "#000",
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
  relatedTrans: {
    color: "#000",
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.3,
  },
});

export default WordCard;
