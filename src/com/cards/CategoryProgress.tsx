import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { CategoryProgressType } from '@/types/category';

export default function CategoryProgress({ name, totalWord, learnedWord }: CategoryProgressType) {
  const progress = Number((learnedWord / totalWord).toFixed(2));
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{name}</Text>
        <Text>
          {learnedWord}/{totalWord}
        </Text>
      </View>
      <ProgressBar progress={progress} color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    gap: 8,
    backgroundColor: 'white',
  },
});
