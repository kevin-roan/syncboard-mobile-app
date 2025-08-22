import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";
import { useApp } from "@/context/appctx";
import { getWorkspaces } from "@/app/services/workspace";

const Home = () => {
  const router = useRouter();

  const { workspace, setWorkspace } = useApp();

  useEffect(() => {
    const fetchWorkspaceInfo = async () => {
      try {
        const data = await getWorkspaces();
        if (data?.length > 0) {
          // set the first workspace as default for now
          setWorkspace(data[0]);
        } else {
          // no workspace found , create a workspace first
          router.push("/(modal)/createworkspace");
        }
      } catch (error) {
        Alert.alert("Error fetching workspaces");
      }
    };
    fetchWorkspaceInfo();
  }, []);
  return (
    <View>
      <Text variant="bodyLarge">Home </Text>
      <Text variant="titleMedium">Current Workspace : </Text>
      <Button
        mode="contained"
        icon={"workspace"}
        onPress={() => router.push("/(modal)/createworkspace")}
      >
        Create Workspace
      </Button>
    </View>
  );
};

export default Home;
