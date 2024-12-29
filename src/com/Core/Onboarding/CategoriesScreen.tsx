import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';

import { useSettingsStore } from '@/store/settingsStore';

export default function CategoriesScreen() {
  const { toggleCategory, categories } = useSettingsStore();

  const handleSelectCategory = (id: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toggleCategory(id);
  };

  return (
    <View style={styles.screen}>
      <Text variant="headlineMedium" style={styles.title}>
        Kategori Seç
      </Text>
      <Text variant="bodyLarge" style={styles.description}>
        Odaklanmak istediğin kategorileri seç.
      </Text>
      <Text variant="bodySmall" style={styles.description}>
        Sonradan değiştirebilirsin.
      </Text>
      <ScrollView style={styles.categoriesContainer}>
        {categories.map((category) => (
          <Checkbox.Item
            key={category.id}
            label={category.name}
            status={category.selected ? 'checked' : 'unchecked'}
            onPress={() => handleSelectCategory(category.id)}
            style={styles.categoryItem}
          />
        ))}
      </ScrollView>
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
  categoriesContainer: {
    width: '100%',
  },
  categoryItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
