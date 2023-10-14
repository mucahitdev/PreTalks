// Here is a navigation stack for the app
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { APP_NAV_TYPE } from "@/common/constants";
import { appRoutes } from "@/routes/appRoutes";

export type ScreenNames = APP_NAV_TYPE; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigations() {
  //   const isOnboardDone = useAppSelector((state) => state.user.isOnboardDone);
  //   if (isOnboardDone) {
  //     appRoutes.shift();
  //   }
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerShown: false,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#9d9d9d" },
      }}
    >
      {appRoutes.map((item, index) => {
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
