import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalForm from "@/components/ui/modals/modalform";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authctx";
import { useApp } from "@/context/appctx";
import styles from "./styles";
import { createProject, getProjects } from "@/app/services/projects";
import { getWorkspaces } from "@/app/services/workspace";
import ProjectCard from "@/components/ui/cards/projectcard";

const HomeScreen = () => {
  const router = useRouter();
  const { session } = useAuth();
  const { workspace, setWorkspace } = useApp();

  const [projectformVisible, setProjectformVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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
      console.log("fetched again");
      try {
        const data = await getProjects(workspace?.id);
        // console.log("projects", JSON.stringify(data, null, 2));
        setProjects(data);
        setRefreshing(false);
      } catch (error: Error) {
        Alert.alert("Error fetching projects");
      }
    };

    fetchProjects();
  }, [workspace, refreshing]);

  const handleCreateProject = async (projectName: string) => {
    try {
      const data = await createProject(projectName, workspace?.id);
      setProjects(data);
      setProjectformVisible(false);
    } catch (error) {
      Alert.alert("Error creating a project.");
    }
  };

  const getUserName = () => {
    return (
      session?.user?.user_metadata?.full_name ||
      session?.user?.email?.split("@")[0] ||
      "User"
    );
  };

  const handleProjectPress = (project: Project) => {
    console.log("Project pressed:", project.name);
  };

  const handleMenuPress = (project: Project) => {
    console.log("Menu pressed for project:", project.name);
  };

  const handleSeeAllProjects = () => {
    console.log("See all projects");
  };

  const handleJoinProject = () => {
    console.log("Join existing project");
  };

  const handleRefresh = () => {
    setRefreshing(true);
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={workspace.name || "Dashboard"} />
        <Appbar.Action icon="bell-outline" onPress={() => {}} />
        <Appbar.Action icon="account-circle" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, {getUserName()}!</Text>
          <Text style={styles.welcomeSubtext}>
            Here's what's happening with your projects today.
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Active Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Tasks Due</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Team Members</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => setProjectformVisible(true)}
            >
              <MaterialCommunityIcons
                name="plus"
                size={24}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>Create Project</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handleJoinProject}
            >
              <MaterialCommunityIcons
                name="account-plus"
                size={24}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>Join Project</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Projects Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={handleSeeAllProjects}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Projects List */}
        {projects.length > 0 ? (
          <FlatList
            data={projects}
            renderItem={({ item }) => {
              return (
                <ProjectCard
                  key={item.id}
                  project={item}
                  onPress={handleProjectPress}
                  onMenuPress={handleMenuPress}
                />
              );
            }}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="folder-open"
              size={64}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>No Projects Yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your first project to get started with managing your tasks
              and team.
            </Text>
          </View>
        )}
        <ModalForm
          visible={projectformVisible}
          title="Enter project name"
          textinputPlaceholder="Enter project name"
          onDismissCb={() => setProjectformVisible(false)}
          onSubmit={handleCreateProject}
        ></ModalForm>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
