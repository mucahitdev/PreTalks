import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";

import { TAB_BAR_NAV, type TAB_BAR_NAV_TYPE } from "@/common/constants";
import { bottomTabRoutes } from "@/routes/bottomTobRoutes";

// ROOT TYPES
export type ScreenNames = TAB_BAR_NAV_TYPE; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

// ROOT COMPONENT
const Tab = createBottomTabNavigator<RootStackParamList>();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={TAB_BAR_NAV.HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      {bottomTabRoutes.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item?.name}
            component={item?.component}
            options={item?.options}
          />
        );
      })}
    </Tab.Navigator>
  );
}
