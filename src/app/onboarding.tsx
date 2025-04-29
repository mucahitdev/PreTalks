import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoriesScreen, LanguageScreen, WelcomeScreen } from '@/com/Core/Onboarding';
import { useSettingsStore } from '@/store/settingsStore';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const offset = useSharedValue(0);
  const { setHasCompletedOnboarding } = useSettingsStore();

  const handleNext = () => {
    if (currentIndex < 2) {
      offset.value = withSpring(-width * (currentIndex + 1), { damping: 15 });
      setCurrentIndex(currentIndex + 1);
    } else {
      setHasCompletedOnboarding(true);
      router.replace('/');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      offset.value = withSpring(-width * (currentIndex - 1), { damping: 15 });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const baseOffset = -width * currentIndex;
      if (
        (currentIndex === 0 && e.translationX > 0) || // First screen, prevent right swipe
        (currentIndex === 2 && e.translationX < 0) // Last screen, prevent left swipe
      ) {
        offset.value = baseOffset + e.translationX / 3; // Add resistance
      } else {
        offset.value = baseOffset + e.translationX;
      }
    })
    .onEnd((e) => {
      if (e.translationX < -SWIPE_THRESHOLD && currentIndex < 2) {
        runOnJS(handleNext)();
      } else if (e.translationX > SWIPE_THRESHOLD && currentIndex > 0) {
        runOnJS(handlePrevious)();
      } else {
        // Spring back to current position
        offset.value = withSpring(-width * currentIndex, { damping: 15 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    width: width * 3,
    flexDirection: 'row',
  }));

  const renderScreen = (index: number) => {
    switch (index) {
      case 0:
        return <WelcomeScreen />;
      case 1:
        return <LanguageScreen />;
      case 2:
        return <CategoriesScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.viewportContainer}>
          <Animated.View style={animatedStyle}>
            {renderScreen(0)}
            {renderScreen(1)}
            {renderScreen(2)}
          </Animated.View>
        </View>
      </GestureDetector>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[styles.paginationDot, index === currentIndex && styles.paginationDotActive]}
            />
          ))}
        </View>
        <Button mode="contained" onPress={handleNext} style={styles.button}>
          {currentIndex === 2 ? 'Başla' : 'Devam Et'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewportContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  screen: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoriesContainer: {
    width: '100%',
  },
  categoryItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  footer: {
    padding: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#000',
  },
  button: {
    marginTop: 10,
  },
});
