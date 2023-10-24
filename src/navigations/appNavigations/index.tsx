import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { APP_NAV_TYPE } from "@/common/constants";
import { appRoutes } from "@/routes/appRoutes";
import { RootState } from "@/store";

export type ScreenNames = APP_NAV_TYPE; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigations() {
  const { isOnboardingCompleted } = useSelector(
    (state: RootState) => state.settings,
  );
  const [isOnboardDone, setIsOnboardDone] = useState<string | null>(null);

  useEffect(() => {
    if (isOnboardingCompleted) {
      setIsOnboardDone("TabStack");
    } else {
      setIsOnboardDone("OnBoarding");
    }
  }, []);

  if (isOnboardDone === null) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isOnboardDone}
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
