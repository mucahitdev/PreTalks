import { FC } from "react";
import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_NAV, GAME_NAV } from "@/common/constants";
import { gameCategories } from "@/common/data/gameCategories";
import { theme } from "@/common/theme";
import { useSetAndroidNavBarColor } from "@/hooks";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  useSetAndroidNavBarColor(theme.colors.primary);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <FlatList
        numColumns={2}
        data={gameCategories}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            disabled={!item.enabled}
            onPress={() =>
              navigation.navigate(APP_NAV.GAME_STACK, {
                screen: GAME_NAV.GAME,
                params: { data: item },
              })
            }
          >
            <Text style={{ color: "#FF4B91" }}>{item.name}</Text>
            {!item.enabled && (
              <View style={styles.comingSoonContainer}>
                <Text style={styles.comingSoon}>Yakında</Text>
              </View>
            )}
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
    overflow: "hidden",
  },
  comingSoonContainer: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  comingSoon: {
    fontSize: 20,
  },
});

export default HomeScreen;
