import { Ionicons } from "@expo/vector-icons";

import { TAB_BAR_NAV } from "@/common/constants";
import DictionarySecreen from "@/screens/DictionarySecreen";
import HomeScreen from "@/screens/home";
import SettingsScreen from "@/screens/settingsScreen";

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
    name: TAB_BAR_NAV.DICTIONARY,
    component: DictionarySecreen,
    options: {
      title: "Dictionary",
      tabBarIcon: ({ focused, color, size }: any) => (
        <Ionicons
          name={focused ? "library" : "library-outline"}
          size={size}
          color={color}
        />
      ),
    },
  },
  {
    name: TAB_BAR_NAV.SETTINGS,
    component: SettingsScreen,
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
