import React, { useRef } from 'react';
import { Alert, FlatList, Text, RefreshControl } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenLayout from '@/provider/screenlayout';
import TopNavigation from '@/components/topnavigation';
import { useGetTasks, useUpdateTaskStatus } from '@/hooks/tasks/useTask';
import { ActivityIndicator } from 'react-native-paper';
import TaskCard from '@/components/cards/taskcard';
import { useUpdateTask } from '@/hooks/tasks/useTask';
import { Task } from '@/types/task';

const Projects = () => {
  const router = useRouter();
  const { id, projectName } = useLocalSearchParams();
  const projectId = Array.isArray(id) ? id[0] : id;

  if (!projectId) {
    router.push('/+not-found');
  }

  const { data, error, isLoading, isRefetching, refetch } = useGetTasks(projectId);
  const {
    mutate: updateTask,
    isPending,
    isError,
    error: updateTaskError,
  } = useUpdateTask(projectId);

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

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    console.log('updates', taskId, updates);
    updateTask(
      { taskId, updates },
      {
        onSuccess: (updatedTask) => {
          console.log('updated tasks status', updatedTask);
        },
        onError: (error) => {
          Alert.alert('Error updating task status');
          console.error('Error updating task status', error);
        },
      }
    );
  };

  return (
    <ScreenLayout>
      <TopNavigation title={projectName} onMenuButtonPress={() => {}} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => handleTaskNavigation(item)}
            onTaskChange={handleUpdateTask}
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
