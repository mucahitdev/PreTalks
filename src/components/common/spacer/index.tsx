import { FC } from "react";
import { View } from "react-native";

interface SpacerProps {
  space: 1 | 2 | 3 | 4;
}

const Spacer: FC<SpacerProps> = ({ space }) => {
  const spaceSize = space * 4;
  return <View style={{ width: spaceSize, height: spaceSize }} />;
};

export default Spacer;
