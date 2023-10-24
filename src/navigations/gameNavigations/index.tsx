// Here is a navigation stack for the app
import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { GAME_NAV_TYPE } from "@/common/constants";
import { gameRoutes } from "@/routes/gameRoutes";

export type ScreenNames = GAME_NAV_TYPE; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createStackNavigator<RootStackParamList>();

export default function GameNavigations() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerShown: false,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#9d9d9d" },
      }}
    >
      {gameRoutes.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item?.name as any}
            component={item?.component}
          />
        );
      })}
    </Stack.Navigator>
  );
}
