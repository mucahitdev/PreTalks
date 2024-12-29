import React from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Chip from '@/com/Chips/Chip';

const categories = [
  { id: 1, name: 'Kategori 1' },
  { id: 2, name: 'Kategori 2' },
  { id: 3, name: 'Kategori 3' },
  { id: 4, name: 'Kategori 4' },
  { id: 5, name: 'Kategori 5' },
  { id: 6, name: 'Kategori 6' },
  { id: 7, name: 'Kategori 7' },
  { id: 8, name: 'Kategori 8' },
  { id: 9, name: 'Kategori 9' },
  { id: 10, name: 'Kategori 10' },
];

export default function GameareaSecreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>X</Text>
        <Text>Seçilmiş 0/4</Text>
        <Text>...</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={{ paddingHorizontal: 8 }}>Kategoriler:</Text>
        <FlatList
          data={categories}
          horizontal
          renderItem={({ item }) => <Chip {...item} />}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 10, gap: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDEC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#79D7BE',
  },
  categoryContainer: {
    paddingTop: 10,
    backgroundColor: 'red',
  },
});
