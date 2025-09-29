import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { createWorkspace } from "../../services/workspace";
import { useAuth } from "@/context/authctx";
import { useRouter } from "expo-router";

const CreateWorkspace = () => {
  const router = useRouter();
  const auth = useAuth();
  const [workspaceName, setWorkspaceName] = useState("");
  const handleCreateWorkspace = async () => {
    const userId = auth?.session?.user?.id;
    try {
      const data = await createWorkspace(workspaceName, userId);
      console.log("created workspace", data);
      router.replace("/home");
    } catch (error) {
      console.log("error creating workspace", error);
      Alert.alert("Error creating workspace");
    }
  };

  const handleInput = (value: string) => {
    setWorkspaceName(value);
  };
  return (
    <View>
      <Text>Create workspace</Text>
      <TextInput
        placeholder="Enter Workspace Name"
        onChangeText={handleInput}
      ></TextInput>
      <Button mode="contained" onPress={handleCreateWorkspace}>
        Save
      </Button>
    </View>
  );
};

export default CreateWorkspace;
