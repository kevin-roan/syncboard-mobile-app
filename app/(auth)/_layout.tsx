import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="singin/index"
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
