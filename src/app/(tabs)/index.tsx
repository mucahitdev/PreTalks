import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryProgress from '@/com/cards/CategoryProgress';
import { theme } from '@/common/theme';

const wordCategories = [
  {
    id: 1,
    name: 'Hayvanlar',
    totalWord: 20,
    learnedWord: 3,
  },
  {
    id: 2,
    name: 'Meyveler',
    totalWord: 10,
    learnedWord: 5,
  },
  {
    id: 3,
    name: 'Renkler',
    totalWord: 10,
    learnedWord: 5,
  },
  {
    id: 4,
    name: 'Sayılar',
    totalWord: 11,
    learnedWord: 11,
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.dayText}>Gün: 1</Text>
          <TouchableOpacity
            onPress={() => router.push('/(noTabs)/gamearea')}
            style={styles.newWordLearn}>
            <Text>Yeni Kelime Öğren</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          {wordCategories.map((category) => (
            <CategoryProgress key={category.id} {...category} />
          ))}
        </View>
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
    padding: 24,
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
    padding: 24,
    gap: 8,
  },
});
