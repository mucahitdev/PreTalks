import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/common/theme";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen;
