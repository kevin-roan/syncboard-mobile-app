import React, { useRef } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenLayout from '@/provider/screenlayout';
import TopNavigation from '@/components/topnavigation';
import { useGetTasks } from '@/hooks/tasks/useGetTasks';
import { ActivityIndicator } from 'react-native-paper';
import TaskCard from '@/components/cards/taskcard';
import { DropdownMenuPreview } from '@/components/ui/dropdownpreview';
import { Status } from '@/types/status';

const Projects = () => {
  const { id: projectId, projectName } = useLocalSearchParams();
  const dropdownPositionRef = useRef(null);
  const router = useRouter();

  const { data, error, isLoading, isRefetching, refetch } = useGetTasks(projectId);
  // create new task

  const handleCreateTask = async (formData) => {
    try {
      const payload = {
        name: formData.taskName,
        description: formData.taskDescription,
        project_id: projectId,
        created_by: userId,
        assigned_to: formData.assignedUserId,
        status: formData?.status,
        due: formData?.dueDate ? convertToISODate(formData.dueDate) : undefined,
      };
      const data = await createTask(payload);
      setTaskFormVisible(false);
      setTasks((prev) => [...prev, data]);
      console.log('task created', data);
    } catch (error) {
      console.log('error creating task', error);
      Alert.alert('Error creating task');
    }
  };

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  const handleTaskNavigation = (task: Project) => {
    router.push({
      pathname: `/task/${task.id}`,
      // hope this doesnt break on production ( or i might need to encode the string and then pass it. )
      params: { taskName: task.name, taskStatus: task.status },
    });
  };

  const handleUpdateTaskStatus = (status: Status) => {
    // make status update api call from jere
  };

  return (
    <ScreenLayout>
      <TopNavigation title={projectName} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => handleTaskNavigation(item)}
            status={item.status}
            onStatusChange={(status) => handleUpdateTaskStatus(status)}
          />
        )}
        ListEmptyComponent={<Text>No Tasks Yet</Text>}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        contentContainerStyle={{ gap: 8, marginVertical: 10, paddingBottom: 100 }}
      />
    </ScreenLayout>
  );
};

export default Projects;
