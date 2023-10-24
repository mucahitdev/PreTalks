import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

import { isAndroid } from "@/utils";

export default function useSetAndroidNavBarColor(color: string) {
  useEffect(() => {
    if (isAndroid) {
      NavigationBar.setBackgroundColorAsync(color);
    }
  }, [color]);
}
