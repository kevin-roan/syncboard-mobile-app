import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, Alert } from 'react-native';

import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authctx';
import { useApp } from '@/context/appctx';
import { createProject, getActiveProjects } from '@/services/projects';
import { getUserWorkspaces } from '@/services/workspace';
import ProjectCard from '@/components/cards/projectcard';
import WorkspaceDrawerModal from '@/components/ui/drawer/workspacedrawer';
import { getDueTaskCount } from '@/services/task';
// import InviteUserModal from '@/components/ui/modals/inviteuser';
// import { createInvitation } from '@/services/invitation';
import { getWorkspaceMemberCount, getWorkspaceUsers } from '@/services/workspace_members';
import ScreenLayout from '@/provider/screenlayout';
import DashboardNavigation from '@/components/ui/navbar/dashboard-header';
import WelcomeBoardCard from '@/components/cards/welcomeboardcard';
import ProjectStatCard from '@/components/cards/dashboard/projectstat-card';
import TaskStatCard from '@/components/cards/dashboard/taskstat-card';
import DashboardQuickActions from '@/components/cards/dashboard/quickaction';
import { Text } from '@/components/ui/text';
import { useGetProjects } from '@/hooks/projects/useGetProjects';

const Dashboard = () => {
  const router = useRouter();
  const { session } = useAuth();
  const { workspace, setWorkspace, setMemberList } = useApp();
  const userId = session?.user?.id;

  const [selectedTab, setSelectedTab] = useState('projects');
  const [projectformVisible, setProjectformVisible] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceMembers, setWorkspaceMembers] = useState([]);
  const [inviteUserModalVisible, setInviteModalVisible] = useState<boolean>(false);
  const [dashboardInfo, setDashboardInfo] = useState({
    taskDue: 0,
    activeProjects: 0,
    teamMembers: 0,
  });

  useEffect(() => {
    const fetchWorkspaceInfo = async () => {
      try {
        if (!userId) return;
        const data = await getUserWorkspaces(userId);
        setWorkspaces(data);
        if (data?.length > 0) {
          setWorkspace(data[0]);
        } else {
          router.push('/(modal)/createworkspace');
        }
      } catch (error) {
        Alert.alert('Error fetching workspaces');
      }
    };

    fetchWorkspaceInfo();
  }, []);

  const { data: projects = [] } = useGetProjects(workspace?.id);

  useEffect(() => {
    if (!workspace?.id) return;

    const fetchWorkspaceMemberList = async (workspaceId: string) => {
      try {
        const resp = await getWorkspaceUsers(workspaceId);
        setWorkspaceMembers(resp);
        setMemberList(resp);
      } catch (error) {
        console.log('error', error);
        Alert.alert('Error fetching workspace members');
      }
    };

    const fetchDashboardMetadata = async (workspaceId: string) => {
      try {
        const [taskDue, activeProjects, teamMembers] = await Promise.all([
          getDueTaskCount(workspaceId),
          getActiveProjects(workspaceId),
          getWorkspaceMemberCount(workspaceId),
        ]);

        setDashboardInfo({ taskDue, activeProjects, teamMembers });
      } catch (error) {
        console.error('Error fetching dashboard metadata:', error);
      }
    };

    fetchWorkspaceMemberList(workspace.id);
    fetchDashboardMetadata(workspace.id);
  }, [workspace]);

  const handleCreateProject = async (projectName: string) => {
    try {
      await createProject(projectName, workspace?.id);
      setProjectformVisible(false);
    } catch (error) {
      Alert.alert('Error creating a project.');
    }
  };

  const handleProjectPress = (project: Project) => {
    router.push({
      pathname: `/dashboard/projects/${project.id}`,
      params: { projectName: project.name },
    });
  };

  const handleWorkspaceChange = (workspaceId: string) => {
    const selectedWorkspace = workspaces.find((ws) => ws.id === workspaceId.id);
    if (selectedWorkspace) setWorkspace(selectedWorkspace);
  };

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <ScreenLayout>
      <DashboardNavigation title={'Software Manson'} />
      <WelcomeBoardCard />

      <View className="mb-3 flex-row gap-3">
        <ProjectStatCard
          memberCount={dashboardInfo.teamMembers}
          completedCount={10}
          activeCount={dashboardInfo.activeProjects}
        />
        <TaskStatCard
          completedCount={0}
          totalCount={dashboardInfo.activeProjects}
          inProgressCount={dashboardInfo.taskDue}
        />
      </View>

      <DashboardQuickActions />

      <View className="flex-row items-center justify-between">
        <View className="my-4 flex flex-row gap-3">
          <TouchableOpacity
            onPress={() => setSelectedTab('projects')}
            disabled={selectedTab === 'projects'}>
            <Text
              variant={'h4'}
              className={selectedTab === 'projects' ? 'text-white' : 'text-muted'}>
              Projects
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('tasks')}
            disabled={selectedTab === 'tasks'}>
            <Text variant={'h4'} className={selectedTab === 'tasks' ? 'text-white' : 'text-muted'}>
              Tasks
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            selectedTab === 'projects' ? router.push('/projectlist') : router.push('/tasks')
          }>
          <Text className="text-sm font-normal text-muted">View All</Text>
        </TouchableOpacity>
      </View>

      <WorkspaceDrawerModal
        drawerVisible={drawerVisible}
        toggleDrawer={toggleDrawer}
        active={workspace?.id || 'default'}
        setActive={handleWorkspaceChange}
        router={router}
        workspaces={workspaces}
      />

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProjectCard key={item.id} project={item} onPress={handleProjectPress} />
        )}
      />
    </ScreenLayout>
  );
};

export default Dashboard;
