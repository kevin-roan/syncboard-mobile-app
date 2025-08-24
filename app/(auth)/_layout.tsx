import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="signin/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
