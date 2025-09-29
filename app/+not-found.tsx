import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import ScreenLayout from "@/provider/screenlayout";

const NotFound = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace("/signin");
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text> 404 Not Found </Text>
        <Button onPress={handleRedirect}>Back to Home</Button>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotFound;
