import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/com/Buttons/BackButton';
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
      <View style={styles.header}>
        <BackButton color="white" />
        <Text style={styles.headerText}>Hadi Başla!</Text>
        <Text>.....</Text>
      </View>
      <FlatList
        data={selectedWords}
        renderItem={({ item }) => <Text>{item.word}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontFamily: theme.fonts.bold,
  },
});

// 1 - Kelime anlam: ing olarak olarak gelen kelimenin anlamını bulacak
// 2 - Dinleme: 1 ing kelime ve 3 ses dosyası arasından doğru olanı seçecek
// 3 - Yazma: Türkçe kelimeyi sanal klavye ile yazacak
// 4 - Okuma: Türkçe kelimeyi sesli okuyacak
