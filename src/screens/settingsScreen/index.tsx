import { FC } from "react";
import { View, Text, StyleSheet, SectionList, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { theme } from "@/common/theme";
import { handleToggle } from "@/helpers";
import { toggleSetting } from "@/store/settingsReducer";

const SettingsScreen: FC = () => {
  const sections = useSelector((state: any) => state.settings.sections);
  const dispatch = useDispatch();

  const onToggle = async (sectionId: number, itemId: number) => {
    const updatedSections = handleToggle(sections, sectionId, itemId);

    dispatch(toggleSetting(updatedSections));
  };

  const renderListItem = (item: any) => {
    switch (item.type) {
      case 1:
        return (
          <View style={[styles.listItem, styles.itemSwitch]}>
            <Text style={styles.listItemText}>{item.title}</Text>
            <Switch
              value={item.value}
              onValueChange={item.action}
              onChange={() => onToggle(item.sectionId, item.id)}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <Text style={styles.pageTitle}>Ayarlar</Text>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderListItem(item)}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.scrim,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 24,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.scrim,
  },
  listItem: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  listItemText: {
    fontSize: 20,
    color: "white",
    fontFamily: theme.fonts.medium,
  },
  itemSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemSlider: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default SettingsScreen;
