import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useRef, useState, useMemo } from 'react';
import { Text, StyleSheet, View, FlatList, Dimensions, Pressable, ScrollView } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/com/Buttons/BackButton';
import SelectWordCard from '@/com/Cards/SelectWordCard';
import Chip from '@/com/Chips/Chip';
import { WordType } from '@/common/data/allWords';
import { theme } from '@/common/theme';
import { useWords } from '@/context/WordsContext';
import { useSettingsStore } from '@/store/settingsStore';

const MAX_LEARN_WORDS = 4;
const { width } = Dimensions.get('window');
const SELECTED_CARD_WIDTH = width * 0.4;
const KNOWN_CARD_WIDTH = width * 0.25;

export default function WordSelectionStepScreen() {
  const { wordManager } = useWords();
  const categories = useSettingsStore((state) => state.categories);
  const selectedCategories = categories.filter((cat) => cat.selected);
  const wordsCategory = wordManager?.getWordCountByCategory(selectedCategories) || [];

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  const [selectedLearnWordsId, setSelectedLearnWordsId] = useState<number[]>([]);
  const [selectedKnowWordsId, setSelectedKnowWordsId] = useState<number[]>([]);

  const selectedCategory = wordsCategory[selectedCategoryIndex];
  const categoryWords: WordType[] =
    wordManager?.getWordsByCategory(selectedCategory.categoryId) || [];

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

  const handleKnowPress = (id: number, index?: number) => {
    if (selectedKnowWordsId.includes(id)) {
      setSelectedKnowWordsId(selectedKnowWordsId.filter((i) => i !== id));
    } else {
      scroolToWordIndex(index ?? 0);
      setSelectedKnowWordsId([...selectedKnowWordsId, id]);
    }
  };

  const handleLearnPress = (id: number, index?: number) => {
    if (selectedLearnWordsId.includes(id)) {
      setSelectedLearnWordsId(selectedLearnWordsId.filter((i) => i !== id));
    } else if (selectedLearnWordsId.length >= MAX_LEARN_WORDS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      scroolToWordIndex(index ?? 0);
      setSelectedLearnWordsId([...selectedLearnWordsId, id]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const renderSelectedWordCard = ({ item, index }: { item: WordType; index: number }) => (
    <Surface style={styles.selectedWordCard} elevation={2}>
      <Pressable style={styles.closeButton} onPress={() => handleLearnPress(item.id)}>
        <MaterialCommunityIcons name="close-circle" size={24} color={theme.colors.error} />
      </Pressable>
      <Text style={styles.selectedWordNumber}>{index + 1}</Text>
      <Text style={styles.selectedWordText}>{item.word}</Text>
      <Text style={styles.selectedWordTranslation}>{item.translations.tr.first}</Text>
    </Surface>
  );

  const renderKnownWordCard = ({ item, index }: { item: WordType; index: number }) => (
    <Surface style={styles.knownWordCard} elevation={2}>
      <Pressable style={styles.closeButton} onPress={() => handleKnowPress(item.id)}>
        <MaterialCommunityIcons name="close-circle" size={20} color={theme.colors.error} />
      </Pressable>
      <Text style={styles.knownWordText}>{item.word}</Text>
    </Surface>
  );

  const selectedWords = useMemo(
    () => wordManager?.getWordByIds(selectedLearnWordsId) || [],
    [selectedLearnWordsId]
  );

  const knownWords = useMemo(
    () => wordManager?.getWordByIds(selectedKnowWordsId) || [],
    [selectedKnowWordsId]
  );

  const handleContinue = () => {
    router.replace({
      pathname: '/(game)/game-area',
      params: {
        selectedWordIds: selectedLearnWordsId.join(','),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color="white" />
        <Text
          style={[
            styles.headerText,
            selectedLearnWordsId.length >= MAX_LEARN_WORDS && styles.headerTextWarning,
          ]}>
          Seçildi {selectedLearnWordsId.length}/{MAX_LEARN_WORDS}
        </Text>
        <Text />
      </View>
      <ScrollView>
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
                handleKnowPress={() => handleKnowPress(item.id, index)}
                handleLearnPress={() => handleLearnPress(item.id, index)}
                knowWord={selectedKnowWordsId.includes(item.id)}
                learnWord={selectedLearnWordsId.includes(item.id)}
                disableLearn={
                  selectedLearnWordsId.length >= MAX_LEARN_WORDS &&
                  !selectedLearnWordsId.includes(item.id)
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
        {selectedKnowWordsId.length > 0 && (
          <View style={styles.knownWordsContainer}>
            <Text style={styles.selectedWordsTitle}>Bildiğin Kelimeler</Text>
            <FlatList
              data={knownWords}
              renderItem={renderKnownWordCard}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.selectedWordsList}
            />
          </View>
        )}
        {selectedLearnWordsId.length > 0 && (
          <View style={styles.selectedWordsContainer}>
            <Text style={styles.selectedWordsTitle}>Öğrenilecek Kelimeler</Text>
            <FlatList
              data={selectedWords}
              renderItem={renderSelectedWordCard}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.selectedWordsList}
            />
          </View>
        )}
        {selectedLearnWordsId.length >= MAX_LEARN_WORDS && (
          <Button
            onPress={handleContinue}
            style={styles.continueButton}
            labelStyle={styles.continueButtonLabel}>
            Devam Et
          </Button>
        )}
      </ScrollView>
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
  selectedWordsContainer: {
    paddingVertical: 16,
  },
  selectedWordsTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: theme.fonts.semiBold,
    marginBottom: 12,
    paddingLeft: 16,
  },
  selectedWordsList: {
    paddingHorizontal: 8,
    gap: 12,
  },
  selectedWordCard: {
    width: SELECTED_CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  selectedWordNumber: {
    fontSize: 14,
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium,
  },
  selectedWordText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontFamily: theme.fonts.bold,
    textAlign: 'center',
  },
  selectedWordTranslation: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontFamily: theme.fonts.medium,
    textAlign: 'center',
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
  knownWordsContainer: {
    paddingVertical: 8,
  },
  knownWordCard: {
    width: KNOWN_CARD_WIDTH,
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  knownWordText: {
    fontSize: 16,
    color: 'white',
    fontFamily: theme.fonts.bold,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 4,
    top: 4,
    zIndex: 3,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});
