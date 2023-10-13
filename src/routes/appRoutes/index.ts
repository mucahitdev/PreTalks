// import OnBoardingNavigation from "navigations/onBoardingNavigations";
// import HomeScreen from "screens/onBoarding/home";

import { APP_NAV } from "@/common/constants";
import HomeScreen from "@/screens/home";
import OnBoardingScreen from "@/screens/onBoarding";

export const appRoutes = [
  {
    name: APP_NAV.ONBOARDING,
    component: OnBoardingScreen,
  },
  {
    name: APP_NAV.MAIN,
    component: HomeScreen,
  },
];
