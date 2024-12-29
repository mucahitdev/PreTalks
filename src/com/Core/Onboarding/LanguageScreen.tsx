import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import AnimatedLanguageChip from '@/com/Chips/AnimatedLanguageChip';
import { Language, useSettingsStore } from '@/store/settingsStore';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
];

export default function LanguageScreen() {
  const { setSelectedLanguage, selectedLanguage } = useSettingsStore();

  return (
    <View style={styles.screen}>
      <Text variant="headlineMedium" style={styles.title}>
        Dilini Seç
      </Text>
      <View style={styles.languageContainer}>
        {languages.map((lang) => (
          <AnimatedLanguageChip
            key={lang.code}
            code={lang.code}
            label={lang.label}
            selected={selectedLanguage === lang.code}
            onSelect={setSelectedLanguage}
          />
        ))}
      </View>
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
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
});
