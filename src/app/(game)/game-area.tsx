import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WordType } from '@/common/data/allWords';
import { theme } from '@/common/theme';
import { useWords } from '@/context/WordsContext';

export default function GameAreaScreen() {
  const params = useLocalSearchParams<{ selectedWordIds: string }>();
  const selectedWordIds = params.selectedWordIds;
  const [selectedWords, setSelectedWords] = useState<WordType[]>([]);
  const { wordManager } = useWords();

  useEffect(() => {
    if (selectedWordIds) {
      const wordIds = selectedWordIds.split(',').map(Number);
      const words = wordManager?.getWordByIds(wordIds) || [];
      setSelectedWords(words);
    }
  }, [selectedWordIds, wordManager]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>Game Area</Text>
        <FlatList
          data={selectedWords}
          renderItem={({ item }) => <Text>{item.word}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
