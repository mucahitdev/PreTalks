import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="gamearea" />
      {/* <Stack.Screen name="two" /> */}
    </Stack>
  );
}
