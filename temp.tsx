import React, { useEffect, useState } from "react";
import { View, Alert, FlatList, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";
import { useApp } from "@/context/appctx";
import { getWorkspaces } from "@/app/services/workspace";
import { Collapsible } from "@/components/Collapsible";
import ModalForm from "@/components/ui/modals/modalform
import { createProject, getProjects } from "@/app/services/projects";
import ScreenLayout from "@/provider/screenlayout";
import ProjectCard from "@/components/ui/taskcard";

const Home = () => {
  const router = useRouter();
  const { workspace, setWorkspace } = useApp();

  const [projectformVisible, setProjectformVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<string[]>([]);

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

  useEffect(() => {
    if (!workspace?.id) return;

    const fetchProjects = async () => {
      try {
        const data = await getProjects(workspace?.id);
        console.log("projects", data);
        setProjects(data);
      } catch (error: Error) {
        Alert.alert("Error fetching projects");
      }
    };

    fetchProjects();
  }, [workspace]);

  const handleCreateProject = async (projectName: string) => {
    try {
      const data = await createProject(projectName, workspace?.id);
      setProjects(data);
      setProjectformVisible(false);
    } catch (error) {
      Alert.alert("Error creating a project.");
    }
  };

  const renderItem = ({ item, index }) => {
    return <ProjectCard project={item} key={index} />;
  };

  return (
    <ScreenLayout>
      <Text variant="bodyLarge">Home </Text>
      <Text variant="titleMedium">Current Workspace : {workspace.name}</Text>
      <Button onPress={() => setProjectformVisible(true)}>
        Create a project
      </Button>
      <ModalForm
        visible={projectformVisible}
        title="Enter project name"
        textinputPlaceholder="Enter project name"
        onDismissCb={() => setProjectformVisible(false)}
        onSubmit={handleCreateProject}
      ></ModalForm>
      <Text>Projects</Text>
      <FlatList data={projects} renderItem={renderItem} />
    </ScreenLayout>
  );
};

export default Home;
