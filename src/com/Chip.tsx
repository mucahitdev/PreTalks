import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ChipProps {
  id: number;
  name: string;
}

export default function Chip({ name }: ChipProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
  },
});
