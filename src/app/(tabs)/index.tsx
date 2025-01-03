import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryProgress from '@/com/CategoryProgress';
import { theme } from '@/common/theme';
import { useWords } from '@/context/WordsContext';
import { useSettingsStore } from '@/store/settingsStore';

export default function Home() {
  const { wordManager } = useWords();
  const setHasCompletedOnboarding = useSettingsStore((state) => state.setHasCompletedOnboarding);
  const categories = useSettingsStore((state) => state.categories);
  const selectedCategories = categories.filter((cat) => cat.selected);

  const wordsCategory = wordManager?.getWordCountByCategory(selectedCategories) || [];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TouchableOpacity onPress={() => setHasCompletedOnboarding(false)}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.dayText}>Gün: 1</Text>
        <TouchableOpacity
          onPress={() => router.push('/(noTabs)/gamearea')}
          style={styles.newWordLearn}>
          <Text>Yeni Kelime Öğren</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={{ marginHorizontal: 16, marginTop: 16 }}>Kategoriler</Text>
        {wordsCategory?.length > 1 && (
          <View style={styles.categories}>
            {wordsCategory?.map((category) => (
              <CategoryProgress key={category.categoryId} {...category} />
            ))}
          </View>
        )}
        <Button
          style={{ marginHorizontal: 16 }}
          icon="square-edit-outline"
          mode="contained"
          onPress={() => router.navigate('/categoryedit')}>
          Kategorileri Düzenle
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    gap: 16,
    backgroundColor: '#ccc',
    borderEndEndRadius: 24,
    borderEndStartRadius: 24,
  },
  dayText: {
    fontSize: 24,
    fontFamily: theme.fonts.semiBold,
  },
  newWordLearn: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
  },
  categories: {
    padding: 16,
    gap: 8,
  },
});
