import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const myColor = {
  primary: '#6A5AE0',
  highlightBackground: '#F0EEFC',
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6A5AE0',
    accent: '#023e8a',
    background: '#fff',
    surface: '#fff',
    error: '#B00020',
    text: '#000',
    onBackground: '#000',
    onSurface: '#000',
    disabled: 'rgba(0, 0, 0, 0.26)',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#f50057',
    highlightBackground: '#F0EEFC',
  },
  fonts: {
    ...DefaultTheme.fonts,
    bold: 'Quicksand_700Bold',
    semiBold: 'Quicksand_600SemiBold',
    medium: 'Quicksand_500Medium',
    regular: 'Quicksand_400Regular',
    light: 'Quicksand_300Light',
  },
};
