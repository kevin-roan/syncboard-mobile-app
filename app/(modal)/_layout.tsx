import React from "react";
import { Stack } from "expo-router";

const ModalLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="createworkspace"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default ModalLayout;
