import { Ionicons } from "@expo/vector-icons";

import { TAB_BAR_NAV } from "@/common/constants";
import HomeScreen from "@/screens/home";

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
];
