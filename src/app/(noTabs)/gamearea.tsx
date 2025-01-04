import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/com/Buttons/BackButton';
import SelectWordCard from '@/com/Cards/SelectWordCard';
import Chip from '@/com/Chips/Chip';
import { theme } from '@/common/theme';
import { useWords } from '@/context/WordsContext';
import { useSettingsStore } from '@/store/settingsStore';

const MAX_LEARN_WORDS = 4;

export default function GameareaScreen() {
  const { wordManager } = useWords();
  const categories = useSettingsStore((state) => state.categories);
  const selectedCategories = categories.filter((cat) => cat.selected);
  const wordsCategory = wordManager?.getWordCountByCategory(selectedCategories) || [];

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [selectedLearnWordsIndex, setSelectedLearnWordsIndex] = useState<number[]>([]);
  const [selectedKnowWordsIndex, setSelectedKnowWordsIndex] = useState<number[]>([]);

  const selectedCategory = wordsCategory[selectedCategoryIndex];
  const categoryWords = wordManager?.getWordsByCategory(selectedCategory.categoryId) || [];

  const categoryFlatList = useRef<FlatList | null>(null);
  const wordFlatList = useRef<FlatList | null>(null);

  const scroolToIndex = (index: number) => {
    categoryFlatList.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const scroolToWordIndex = (index: number) => {
    if (index !== categoryWords.length - 1) {
      wordFlatList.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    }
  };

  const handleKnowPress = (index: number) => {
    if (selectedKnowWordsIndex.includes(index)) {
      setSelectedKnowWordsIndex(selectedKnowWordsIndex.filter((i) => i !== index));
    } else {
      scroolToWordIndex(index);
      setSelectedKnowWordsIndex([...selectedKnowWordsIndex, index]);
    }
  };

  const handleLearnPress = (index: number) => {
    if (selectedLearnWordsIndex.includes(index)) {
      setSelectedLearnWordsIndex(selectedLearnWordsIndex.filter((i) => i !== index));
    } else if (selectedLearnWordsIndex.length >= MAX_LEARN_WORDS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      scroolToWordIndex(index);
      setSelectedLearnWordsIndex([...selectedLearnWordsIndex, index]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleContinue = () => {
    console.log(
      'Selected words:',
      selectedLearnWordsIndex.map((index) => categoryWords[index])
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color="white" />
        <Text
          style={[
            styles.headerText,
            selectedLearnWordsIndex.length >= MAX_LEARN_WORDS && styles.headerTextWarning,
          ]}>
          Seçildi {selectedLearnWordsIndex.length}/{MAX_LEARN_WORDS}
        </Text>
        <Text>...</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Kategoriler:</Text>
        <FlatList
          ref={categoryFlatList}
          data={wordsCategory}
          horizontal
          renderItem={({ item, index }) => (
            <Chip
              {...item}
              isSelected={selectedCategoryIndex === index}
              onPress={() => {
                wordFlatList.current?.scrollToIndex({ index: 0, animated: true });
                setSelectedCategoryIndex(index);
                scroolToIndex(index);
              }}
            />
          )}
          keyExtractor={(item) => item.categoryId.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 10, gap: 10 }}
        />
        <FlatList
          ref={wordFlatList}
          data={categoryWords}
          renderItem={({ item, index }) => (
            <SelectWordCard
              {...item}
              handleKnowPress={() => handleKnowPress(index)}
              handleLearnPress={() => handleLearnPress(index)}
              knowWord={selectedKnowWordsIndex.includes(index)}
              learnWord={selectedLearnWordsIndex.includes(index)}
              disableLearn={
                selectedLearnWordsIndex.length >= MAX_LEARN_WORDS &&
                !selectedLearnWordsIndex.includes(index)
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          pagingEnabled
          decelerationRate="fast"
          style={{ paddingVertical: 16 }}
        />
      </View>
      {selectedLearnWordsIndex.length >= MAX_LEARN_WORDS && (
        <Button
          onPress={handleContinue}
          style={styles.continueButton}
          labelStyle={styles.continueButtonLabel}>
          Devam Et
        </Button>
      )}
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
  categoryContainer: {
    paddingTop: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontFamily: theme.fonts.bold,
  },
  headerTextWarning: {
    color: 'lightgreen',
  },
  categoryTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: theme.fonts.semiBold,
    paddingLeft: 16,
  },
  continueButton: {
    margin: 16,
    backgroundColor: 'lightgreen',
  },
  continueButtonLabel: {
    fontSize: 16,
    color: theme.colors.accent,
    fontFamily: theme.fonts.bold,
  },
});
