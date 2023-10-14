import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";

import { TAB_BAR_NAV, type TAB_BAR_NAV_TYPE } from "@/common/constants";
import { theme } from "@/common/theme";
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
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 5,
          borderRadius: 15,
          height: 60,
          paddingBottom: 0,
          borderTopWidth: 0,
          backgroundColor: theme.colors.highlightBackground,
          shadowColor: theme.colors.primary,
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          shadowOffset: {
            width: 0,
            height: 5,
          },
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
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
