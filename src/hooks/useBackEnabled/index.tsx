import { useEffect } from "react";
import { Alert } from "react-native";

export default function useBackEnabled(navigation: any, isEnabled: boolean) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      if (isEnabled) {
        return;
      }

      e.preventDefault();

      Alert.alert("Geri dön", "Bu ekrandan çıkmak istediğinize emin misiniz?", [
        { text: "Kal", style: "cancel", onPress: () => {} },
        {
          text: "Çık",
          style: "destructive",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });

    return unsubscribe;
  }, [navigation, isEnabled]);
}
