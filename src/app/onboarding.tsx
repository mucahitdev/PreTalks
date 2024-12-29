import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useSettingsStore } from '../store/settingsStore';

const onboardingData = [
  {
    title: 'Welcome to PreTalks',
    description: 'Your new favorite communication platform',
  },
  {
    title: 'Connect with Others',
    description: 'Meet and chat with people who share your interests',
  },
  {
    title: 'Start Your Journey',
    description: "Ready to begin? Let's get started!",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setHasCompletedOnboarding } = useSettingsStore();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setHasCompletedOnboarding(true);
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn} exiting={FadeOut} key={currentIndex} style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {onboardingData[currentIndex].title}
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          {onboardingData[currentIndex].description}
        </Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.paginationDot, index === currentIndex && styles.paginationDotActive]}
            />
          ))}
        </View>
        <Button mode="contained" onPress={handleNext} style={styles.button}>
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
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
