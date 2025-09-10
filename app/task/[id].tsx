import React from "react";
import { View, Text } from "react-native";
import ScreenLayout from "@/provider/screenlayout";
import { useLocalSearchParams } from "expo-router";

const Task = () => {
  const { id } = useLocalSearchParams();
  console.log("id", id);
  return (
    <ScreenLayout>
      <View>
        <Text>Task Info : {id}</Text>
      </View>
    </ScreenLayout>
  );
};

export default Task;
