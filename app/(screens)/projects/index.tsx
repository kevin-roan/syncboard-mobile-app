import { View, FlatList } from 'react-native';
import { Appbar, Text, Surface, FAB, ActivityIndicator, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/appctx';
import ScreenLayout from '@/provider/screenlayout';
import ProjectCard from '@/components/cards/projectcard';
import styles from './styles';
import NavHeader from '@/components/ui/navbar/navheader';
import { useGetProjects } from '@/hooks/projects/useGetProjects';

const Projects = () => {
  const { workspace } = useApp();
  const router = useRouter();
  const theme = useTheme();

  const {
    data: projects = [],
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetProjects(workspace?.id);

  const handleProjectPress = (project: Project) => {
    router.push({
      pathname: `/dashboard/projects/${project.id}`,
      params: { projectName: project.name },
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

  if (isLoading) {
    return (
      <ScreenLayout>
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
      <NavHeader title="Projects" />

      {projects.length > 0 ? (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item }) => (
            <ProjectCard key={item.id} project={item} onPress={handleProjectPress} />
          )}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={refetch}
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

export default Projects;
