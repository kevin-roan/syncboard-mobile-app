import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const OnBoarding = () => {
  const router = useRouter();
  return (
    <View>
      <Text>OnBoarding</Text>
      <Button title={"Sign In"} onPress={() => router.push("/signin")} />
      <Button title={"Sign Up"} onPress={() => router.push("/signup")} />
    </View>
  );
};

export default OnBoarding;
