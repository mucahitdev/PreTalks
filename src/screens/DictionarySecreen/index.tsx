import { FC, useRef, useState } from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import words from "@/common/data/allWords";
import { filterOptions } from "@/common/data/filteOptions";
import { theme } from "@/common/theme";
import { FilterChip, WordCard } from "@/components";

const DictionarySecreen: FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number>(0);
  const [filteredWords, setFilteredWords] = useState(words);

  const onPressFilterChip = (id: number) => {
    setSelectedOptionId(id);
    if (id === 0) {
      setFilteredWords(words);
    } else {
      const filteredWords = words.filter((word) => word.level === id);
      setFilteredWords(filteredWords);
    }
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <Text style={styles.pageTitle}>Sözlük</Text>
      <View>
        <FlatList
          horizontal
          data={filterOptions}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <FilterChip
              {...item}
              onPress={onPressFilterChip}
              selectedOptionId={selectedOptionId}
            />
          )}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={filteredWords}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 16, paddingBottom: 200 }}
        renderItem={({ item }) => <WordCard {...item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    gap: 16,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.scrim,
    textAlign: "center",
  },
});

export default DictionarySecreen;
