import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

import { theme } from "@/common/theme";

interface BigButtonProps extends ButtonProps {}

const BigButton: FC<BigButtonProps> = ({ ...rest }) => {
  return (
    <Button
      labelStyle={styles.label}
      mode="contained"
      style={styles.container}
      contentStyle={styles.button}
      {...rest}
    >
      {rest.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    height: 56,
    borderRadius: 20,
    fontFamily: theme.fonts.bold,
  },
  label: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    lineHeight: 24,
  },
});

export default BigButton;
