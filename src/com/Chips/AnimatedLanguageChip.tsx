import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, Surface } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { AnimatedLanguageChipProps } from '@/types/chipTypes';

export default function AnimatedLanguageChip({
  code,
  label,
  selected,
  onSelect,
}: AnimatedLanguageChipProps) {
  const scale = useSharedValue(1);

  const chipStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    Haptics.selectionAsync();
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    onSelect(code);
  };

  const AnimatedSurface = Animated.createAnimatedComponent(Surface);

  return (
    <AnimatedSurface style={[styles.chipContainer, chipStyle]}>
      <Chip selected={selected} onPress={handlePress} style={styles.languageChip}>
        {label}
      </Chip>
    </AnimatedSurface>
  );
}

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  chipContainer: {
    borderRadius: 20,
  },
  languageChip: {
    margin: 0,
  },
});
