import React from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenLayout from '@/provider/screenlayout';
import TopNavigation from '@/components/ui/navbar/navheader';
import { useGetTasks } from '@/hooks/tasks/useGetTasks';
import { ActivityIndicator } from 'react-native-paper';
import TaskCard from '@/components/cards/taskcard';
import { DropdownMenuPreview } from '@/components/ui/dropdownpreview';

const Projects = () => {
  const { id: projectId, projectName } = useLocalSearchParams();

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

  return (
    <ScreenLayout>
      <TopNavigation title={projectName} />
      <DropdownMenuPreview />
      <FlatList
        data={data}
        renderItem={({ item }) => <TaskCard task={item} />}
        ListEmptyComponent={<Text>No Tasks Yet</Text>}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        contentContainerStyle={{ gap: 8, marginVertical: 10, paddingBottom: 100 }}
      />
    </ScreenLayout>
  );
};

export default Projects;
