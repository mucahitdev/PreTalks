import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CategoriesScreen } from '@/com/Core/Onboarding';

export default function Categoryedit() {
  return (
    <View style={styles.container}>
      <CategoriesScreen isOnboarding={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 32,
  },
});
