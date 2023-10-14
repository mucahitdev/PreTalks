import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import { TAB_BAR_NAV } from "@/common/constants";
import HomeScreen from "@/screens/home";

const Settings = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export const bottomTabRoutes = [
  {
    name: TAB_BAR_NAV.HOME,
    component: HomeScreen,
    options: {
      title: "Home",
      tabBarIcon: ({ focused, color, size }: any) => (
        <Ionicons
          name={focused ? "home" : "home-outline"}
          size={size}
          color={color}
        />
      ),
    },
  },
  {
    name: TAB_BAR_NAV.SETTINGS,
    component: Settings,
    options: {
      title: "Settings",
      tabBarIcon: ({ focused, color, size }: any) => (
        <Ionicons
          name={focused ? "settings" : "settings-outline"}
          size={size}
          color={color}
        />
      ),
    },
  },
];
