// export const theme = {
//   colors: {
//     primary: {
//       100: "#6A5AE0",
//       200: "#ade8f4",
//       300: "#90e0ef",
//       400: "#48cae4",
//       500: "#00b4d8",
//       600: "#0096c7",
//       700: "#0077b6",
//       800: "#023e8a",
//     },
//   },
//   fonts: {
//     300: "Quicksand_300Light",
//     400: "Quicksand_400Regular",
//     500: "Quicksand_500Medium",
//     600: "Quicksand_600SemiBold",
//     700: "Quicksand_700Bold",
//   },
// };

import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const myColor = {
  primary: "#6A5AE0",
  highlightBackground: "#F0EEFC",
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6A5AE0",
    accent: "#023e8a",
    background: "#fff",
    surface: "#fff",
    error: "#B00020",
    text: "#000",
    onBackground: "#000",
    onSurface: "#000",
    disabled: "rgba(0, 0, 0, 0.26)",
    placeholder: "rgba(0, 0, 0, 0.54)",
    backdrop: "rgba(0, 0, 0, 0.5)",
    notification: "#f50057",
    highlightBackground: "#F0EEFC",
  },
  fonts: {
    ...DefaultTheme.fonts,
    bold: "Quicksand_700Bold",
    semiBold: "Quicksand_600SemiBold",
    medium: "Quicksand_500Medium",
    regular: "Quicksand_400Regular",
    light: "Quicksand_300Light",
  },
};
