import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ChipProps {
  categoryId: number;
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function Chip({ name, isSelected, onPress }: ChipProps) {
  return (
    <TouchableOpacity style={[styles.container, isSelected && styles.selected]} onPress={onPress}>
      <Text>{name}</Text>
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
    backgroundColor: 'pink',
  },
});
