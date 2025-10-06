import { Stack } from 'expo-router';

const ScreensStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="projectlist/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="memberlist/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="workspace/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ScreensStackLayout;
