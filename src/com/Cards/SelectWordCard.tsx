import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

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
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.wordText}>{word}</Text>
        <Text style={styles.translationText}>{translations?.tr.first}</Text>
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
  },
  translationText: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
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
