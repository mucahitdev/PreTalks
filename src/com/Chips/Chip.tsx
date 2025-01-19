import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { theme } from '@/common/theme';

interface ChipProps {
  categoryId: number;
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function Chip({ name, isSelected, onPress }: ChipProps) {
  return (
    <TouchableOpacity style={[styles.container, isSelected && styles.selected]} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  selected: {
    backgroundColor: '#79D7BE',
  },
  text: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.accent,
  },
});
