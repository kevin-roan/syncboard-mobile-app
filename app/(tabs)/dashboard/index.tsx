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
import WorkspaceDrawerModal from "@/components/ui/drawer/workspacedrawer";
import { getDueTaskCount } from "@/app/services/task";

const Dashboard = () => {
  const router = useRouter();
  const { session } = useAuth();
  const { workspace, setWorkspace } = useApp();

  const [projectformVisible, setProjectformVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState({
    taskDue: 0,
  });

  useEffect(() => {
    const fetchWorkspaceInfo = async () => {
      try {
        const data = await getWorkspaces();
        setWorkspaces(data); // Store all workspaces
        if (data?.length > 0) {
          setWorkspace(data[0]);
        } else {
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
        setProjects(data);
        setRefreshing(false);
      } catch (error: Error) {
        Alert.alert("Error fetching projects");
      }
    };

    const fetchDashboardMetadata = async (workspaceId: string) => {
      try {
        const taskDue = await getDueTaskCount(workspaceId);
        setDashboardInfo((prev) => ({ ...prev, taskDue }));
      } catch (error) {
        console.error("Error fetching dashboard metadata:", error);
      }
    };

    fetchDashboardMetadata(workspace.id);

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
    router.push({
      pathname: `/dashboard/projects/${project.id}`,
      params: {
        id: project.id,
        projectName: project.name,
      },
    });
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

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // Handle workspace switching
  const handleWorkspaceChange = (workspaceId: string) => {
    const selectedWorkspace = workspaces.find((ws) => ws.id === workspaceId);
    if (selectedWorkspace) {
      setWorkspace(selectedWorkspace);
    }
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <Appbar.Content title={workspace?.name || "Dashboard"} />
        <Appbar.Action icon="bell-outline" onPress={() => {}} />
        <Appbar.Action icon="account-circle" onPress={() => {}} />
      </Appbar.Header>

      {/* Fixed WorkspaceDrawer */}
      <WorkspaceDrawerModal
        drawerVisible={drawerVisible} // ✅ Use state, not hardcoded true
        toggleDrawer={toggleDrawer}
        active={workspace?.id || "default"} // ✅ Pass string ID, not object
        setActive={handleWorkspaceChange} // ✅ Handle workspace switching properly
        router={router} // ✅ Pass real router
        workspaces={workspaces} // ✅ Pass all workspaces
      />

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
            <Text style={styles.statNumber}>{dashboardInfo.taskDue}</Text>
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
        />
      </ScrollView>
    </>
  );
};

export default Dashboard;
