import { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, Text, Surface, FAB, ActivityIndicator, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/appctx';
import ScreenLayout from '@/provider/screenlayout';
import ProjectCard from '@/components/cards/projectcard';
import { getProjects } from '@/services/projects';
import styles from './styles';
import NavHeader from '@/components/ui/navbar/navheader';

const ProjectList = () => {
  const { workspace } = useApp();
  const router = useRouter();
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects(workspace?.id);
        setProjects(data);
      } catch (error: Error) {
        console.log('error fetching projects', error);
        // You might want to show a Snackbar instead of Alert for better UX
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchProjects();
  }, [workspace?.id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getProjects(workspace?.id);
      setProjects(data);
    } catch (error) {
      console.log('error refreshing projects', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleProjectPress = (project: Project) => {
    router.push({
      pathname: `/dashboard/projects/${project.id}`,
      params: {
        projectName: project.name,
      },
    });
  };

  const handleCreateProject = () => {
    router.push('/dashboard/projects/create');
  };

  const renderEmptyState = () => (
    <Surface style={styles.emptyStateContainer} elevation={0}>
      <View style={styles.emptyStateContent}>
        <MaterialCommunityIcons
          name="folder-open-outline"
          size={80}
          color={theme.colors.onSurfaceVariant}
          style={styles.emptyIcon}
        />
        <Text variant="headlineSmall" style={styles.emptyTitle}>
          No Projects Yet
        </Text>
        <Text
          variant="bodyMedium"
          style={[styles.emptySubtitle, { color: theme.colors.onSurfaceVariant }]}>
          Create your first project to get started with managing your tasks and team.
        </Text>
      </View>
    </Surface>
  );

  if (loading) {
    return (
      <ScreenLayout>
        {/*
           *        <Appbar.Header elevated>
          <Appbar.Content title="Projects" />
          <Appbar.Action icon="plus" onPress={handleCreateProject} />
        </Appbar.Header>
           * */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text variant="bodyMedium" style={styles.loadingText}>
            Loading projects...
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      {/*
          *      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Projects" subtitle={workspace?.name || 'Select workspace'} />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
        <Appbar.Action icon="plus" onPress={handleCreateProject} />
      </Appbar.Header>
          * */}
      <NavHeader title="Projects" />

      {projects.length > 0 ? (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingVertical: 20,
          }}
          renderItem={({ item }) => {
            console.log('json', JSON.stringify(item, null, 2));
            return (
              <ProjectCard
                key={item.id}
                project={item} // Pass the entire item here
                onPress={handleProjectPress}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        renderEmptyState()
      )}
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleCreateProject}
        label="New Project"
      />
    </ScreenLayout>
  );
};

export default ProjectList;
