import { Feather } from "@expo/vector-icons";
import React, { RefObject } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";

import { APP_NAV, TAB_BAR_NAV } from "@/common/constants";
import { myColor, theme } from "@/common/theme";
import { setOnboardingCompleted } from "@/store/settingsReducer";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonProps = {
  flatListRef: RefObject<FlatList>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
  navigation: any;
};

export function OnBoardButton({
  dataLength,
  flatListIndex,
  flatListRef,
  navigation,
}: ButtonProps) {
  const dispatch = useDispatch();
  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      width: isLastScreen ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [
        { translateX: isLastScreen ? withTiming(100) : withTiming(0) },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastScreen ? withTiming(0) : withTiming(100) },
      ],
    };
  });

  const handleNextScreen = async () => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      dispatch(setOnboardingCompleted());
      navigation.navigate(APP_NAV.TAB_STACK, { screen: TAB_BAR_NAV.HOME });
    }
  };

  return (
    <AnimatedPressable
      onPress={handleNextScreen}
      style={[styles.container, buttonAnimationStyle]}
    >
      <Animated.Text style={[styles.text, textAnimationStyle]}>
        Get Started
      </Animated.Text>

      <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
        <Feather name="arrow-right" size={30} color="white" />
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: myColor.primary,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  text: {
    position: "absolute",
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: "white",
  },
});
