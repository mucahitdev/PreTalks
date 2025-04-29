import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { Button } from '../Button';

import { WordType } from '@/common/data/allWords';
import { theme } from '@/common/theme';

const width = Dimensions.get('window').width;

interface SelectWordCardProps extends WordType {
  handleKnowPress: () => void;
  handleLearnPress: () => void;
  knowWord: boolean;
  learnWord: boolean;
  disableLearn?: boolean;
}

export default function SelectWordCard({
  word,
  translations,
  handleKnowPress,
  handleLearnPress,
  knowWord,
  learnWord,
  disableLearn = false,
}: SelectWordCardProps) {
  const handleSpeak = (rate: number = 1) => {
    Speech.speak(word, {
      language: 'en',
      rate,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.wordText}>{word}</Text>
        <Text style={styles.translationText}>{translations?.tr.first}</Text>
        <View style={styles.speakContainer}>
          <TouchableOpacity
            onPress={() => handleSpeak()}
            style={styles.speakButton}
            activeOpacity={0.7}>
            <MaterialCommunityIcons name="volume-high" size={32} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSpeak(0.1)}
            style={styles.speakButton}
            activeOpacity={0.7}>
            <MaterialCommunityIcons name="volume-medium" size={24} color={theme.colors.secondary} />
            <MaterialCommunityIcons
              name="turtle"
              size={16}
              color={theme.colors.secondary}
              style={styles.turtleIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          {!learnWord && (
            <Button
              title={knowWord ? 'Bilmiyorum' : 'Biliyorum'}
              style={styles.iKnowButton}
              onPress={handleKnowPress}
            />
          )}
          {!knowWord && (
            <Button
              title={learnWord ? 'Öğrenmek İstemiyorum' : 'Öğren'}
              style={[styles.wantToLearnButton, disableLearn && styles.disabledButton]}
              titleStyle={[{ color: 'black' }, disableLearn && styles.disabledButtonText]}
              onPress={handleLearnPress}
              disabled={disableLearn}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  wordText: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    marginBottom: 8,
  },
  translationText: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    marginBottom: 16,
  },
  speakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  speakButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  turtleIcon: {
    marginLeft: 4,
  },
  buttonsContainer: {
    marginTop: 'auto',
    width: '100%',
    gap: 8,
  },
  iKnowButton: {
    backgroundColor: theme.colors.secondary,
  },
  wantToLearnButton: {
    backgroundColor: 'lightgreen',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  disabledButtonText: {
    color: '#999',
  },
});
