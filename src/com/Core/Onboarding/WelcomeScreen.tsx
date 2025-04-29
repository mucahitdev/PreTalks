import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function WelcomeScreen() {
  return (
    <View style={styles.screen}>
      <Text variant="headlineMedium" style={styles.title}>
        PreTalks a Hoşgeldin
      </Text>
      <Text variant="bodyLarge" style={styles.description}>
        Hadi buraları sana özel hale getirelim
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
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
});
