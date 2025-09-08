import { Stack } from "expo-router";

const ScreensStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="projectlist/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ScreensStackLayout;
