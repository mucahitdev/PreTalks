import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ProgressBar from '../ProgressBar';

import { CategoryProgressType } from '@/types/category';

const MOCK_COUNT = 10;

export default function CategoryProgress({ name, categoryId, count }: CategoryProgressType) {
  const progress = count > 0 ? MOCK_COUNT / count : 0;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{name}</Text>
        <Text>
          {MOCK_COUNT}/{count}
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
