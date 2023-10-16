import { FC } from "react";
import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_NAV, GAME_NAV } from "@/common/constants";
import { gameCategories } from "@/common/data/gameCategories";
import { theme } from "@/common/theme";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <FlatList
        style={styles.list}
        numColumns={2}
        data={gameCategories}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            onPress={() =>
              navigation.navigate(APP_NAV.GAME_STACK, {
                screen: GAME_NAV.GAME,
                params: { data: item },
              })
            }
          >
            <Text style={{ color: "#FF4B91" }}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  list: {
    padding: 16,
  },
  listItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "pink",
  },
});

export default HomeScreen;
