import LottieView from "lottie-react-native";
import React from "react";
import { View, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#eee",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../../assets/images/books.json")}
      />
    </View>
  );
};

export default HomeScreen;
