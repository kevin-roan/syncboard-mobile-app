import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import ScreenLayout from '@/provider/screenlayout';
import { useGetTasks } from '@/hooks/tasks/useGetTasks';
import TaskCard from '@/components/cards/taskcard';
import TopNavigation from '@/components/ui/navbar/navheader';

const Project = () => {
  const { id: projectId, projectName } = useLocalSearchParams();
  const { data, error, isLoading } = useGetTasks(projectId);

  // console.log('project id', data, error, isLoading);

  const handleDeleteTask = () => {};
  const handleUpdateTask = () => {};

  const renderItem = ({ item, index }) => {
    return (
      <TaskCard
        id={item.id}
        key={index}
        title={item.name}
        status={item.status}
        description={item.description}
        dueDate={item?.due}
        onStatusChangeCb={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />
    );
  };

  return (
    <ScreenLayout>
      <TopNavigation title={projectName} />
      {/*

      <FlatList data={data} renderItem={renderItem} />
      */}
    </ScreenLayout>
  );
};

export default Project;


