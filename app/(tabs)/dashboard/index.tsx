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
import {
  createProject,
  getActiveProjects,
  getProjects,
} from "@/app/services/projects";
import { getWorkspaces } from "@/app/services/workspace";
import ProjectCard from "@/components/ui/cards/projectcard";
import WorkspaceDrawerModal from "@/components/ui/drawer/workspacedrawer";
import { getDueTaskCount } from "@/app/services/task";
import InviteUserModal from "@/components/ui/modals/inviteuser";
import { createInvitation } from "@/app/services/invitation";
import {
  getWorkspaceMemberCount,
  getWorkspaceUsers,
} from "@/app/services/workspace_members";
import UserCard from "@/components/ui/cards/workspace_membercard";
import moment from "moment";

const Dashboard = () => {
  const router = useRouter();
  const { session } = useAuth();
  const { workspace, setWorkspace, setMemberList } = useApp();

  const userId = session?.user?.id;

  const [projectformVisible, setProjectformVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceMembers, setWorkspaceMembers] = useState([]);
  const [inviteUserModalVisible, setInviteModalVisible] =
    useState<boolean>(false);
  const [dashboardInfo, setDashboardInfo] = useState({
    taskDue: 0,
    activeProjects: 0,
    teamMembers: 0,
  });

  useEffect(() => {
    const fetchWorkspaceInfo = async () => {
      try {
        const data = await getWorkspaces();
        setWorkspaces(data);
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
      try {
        const data = await getProjects(workspace?.id);
        setProjects(data);
        setRefreshing(false);
      } catch (error: Error) {
        console.log("error fetching projects", error);
        Alert.alert("Error fetching projects");
      }
    };

    const fetchWorkspaceMemberList = async (workspaceId: string) => {
      try {
        const resp = await getWorkspaceUsers(workspaceId);
        setWorkspaceMembers(resp);
        setMemberList(resp);
      } catch (error) {
        console.log("error", error);
        Alert.alert("Error fetching workpace members");
      }
    };

    const fetchDashboardMetadata = async (workspaceId: string) => {
      try {
        const [taskDue, activeProjects, teamMembers] = Promise.all([
          getDueTaskCount(workspaceId),
          getActiveProjects(workspaceId),
          getWorkspaceMemberCount(workspaceId),
        ]);

        setDashboardInfo((prev) => ({
          ...prev,
          taskDue,
          activeProjects,
          teamMembers,
        }));
      } catch (error) {
        console.error("Error fetching dashboard metadata:", error);
      }
    };

    fetchDashboardMetadata(workspace.id);

    fetchWorkspaceMemberList(workspace.id);
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
        // id: project.id,
        projectName: project.name,
      },
    });
  };

  const handleMenuPress = (project: Project) => {
    console.log("Menu pressed for project:", project.name);
  };

  const handleSeeAllProjects = () => {
    router.push("/projectlist");
    // console.log("See all projects");
  };

  const handleSeeWorkspaceMembers = () => {
    router.push("/memberlist");
  };

  const handleInviteUser = async (email: string, role?: string) => {
    if (!userId) {
      Alert.alert("No user session found");
      return;
    }
    try {
      await createInvitation({
        email,
        role, // will be omitted if undefined, DB default applies
        workspaceId: workspace.id,
        invitedBy: userId,
      });

      Alert.alert(
        "Invitation Sent! 🎉",
        `Invitation sent to ${email} as ${role === "admin" ? "Admin" : "Member"}`,
        [{ text: "Great!", onPress: () => setInviteModalVisible(false) }],
      );
    } catch (error) {
      console.log("error", error);
      Alert.alert("Error", "Failed to send invitation. Please try again.");
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleWorkspaceChange = (workspaceId: string) => {
    const selectedWorkspace = workspaces.find((ws) => ws.id === workspaceId.id);
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
        drawerVisible={drawerVisible}
        toggleDrawer={toggleDrawer}
        active={workspace?.id || "default"}
        setActive={handleWorkspaceChange}
        router={router}
        workspaces={workspaces}
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
            <Text style={styles.statNumber}>
              {dashboardInfo.activeProjects}
            </Text>
            <Text style={styles.statLabel}>Active Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{dashboardInfo.taskDue}</Text>
            <Text style={styles.statLabel}>Tasks Due</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{dashboardInfo.teamMembers}</Text>
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
              onPress={() => setInviteModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="account-plus"
                size={24}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>Invite User</Text>
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

        {/* workspace members List */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Workspace Members</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={handleSeeWorkspaceMembers}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {workspaceMembers.length > 0 ? (
          <FlatList
            data={workspaceMembers}
            renderItem={({ item, index }) => {
              return (
                <UserCard
                  role={item?.role}
                  email={item?.email}
                  key={item?.id}
                  userName={item.username}
                  joinedAt={moment(item.joined_at).format("DD MMM YYYY")}
                  avatarUrl={item.avatar_url}
                />
              );
            }}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="human-handsup"
              size={64}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>
              Your workspace doesn't have any members yet.
            </Text>

            <TouchableOpacity
              style={[
                styles.quickActionButton,
                {
                  width: 200,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                },
              ]}
              onPress={() => setInviteModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="account-plus"
                size={24}
                style={[
                  styles.quickActionIcon,
                  {
                    marginBottom: 0,
                  },
                ]}
              />
              <Text style={styles.quickActionText}>Invite User</Text>
            </TouchableOpacity>
          </View>
        )}

        <ModalForm
          visible={projectformVisible}
          title="Enter project name"
          textinputPlaceholder="Enter project name"
          onDismissCb={() => setProjectformVisible(false)}
          onSubmit={handleCreateProject}
        />

        <InviteUserModal
          visible={inviteUserModalVisible}
          onDismissCb={() => setInviteModalVisible(false)}
          onSubmit={handleInviteUser}
        />
      </ScrollView>
    </>
  );
};

export default Dashboard;
