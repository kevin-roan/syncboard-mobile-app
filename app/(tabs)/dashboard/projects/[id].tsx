import React, { useState, useEffect } from "react";
import { Alert, FlatList, RefreshControl, View, StatusBar } from "react-native";
import { Text, Appbar, Button, FAB } from "react-native-paper";
import styles from "./styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useApp } from "@/context/appctx";
import {
  createTask,
  deleteTaskById,
  getTasks,
  updateTaskStatus,
} from "@/app/services/task";

import { useAuth } from "@/context/authctx";
import TaskCard from "@/components/ui/cards/taskcard";
import TaskFormModal from "@/app/(modal)/createtask";
import { Colors } from "@/constants/Colors";

const Project = () => {
  const router = useRouter();
  const { id: projectId, projectName } = useLocalSearchParams();
  const auth = useAuth();
  const { workspace } = useApp();

  const userId = auth?.session?.user?.id;

  const [tasks, setTasks] = useState([]);
  const [taskFormVisible, setTaskFormVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const resp = await getTasks(projectId);
      setTasks(resp);
    } catch (error) {
      console.log("error fetching tasks", error);
      Alert.alert("Error fetching tasks");
    } finally {
      setRefreshing(false); // always reset refreshing
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  const handleCreateTask = async (formData) => {
    // console.log("form data", formData);
    try {
      const payload = {
        name: formData.taskName,
        description: formData.taskDescription,
        project_id: projectId,
        created_by: userId,
        assigned_to: formData.assignedUserId,
        status: formData?.status,
        due: formData?.dueDate,
      };
      const data = await createTask(payload);
      setTaskFormVisible(false);
      setTasks((prev) => [...prev, data]);
      console.log("task created", data);
    } catch (error) {
      console.log("error creating task", error);
      Alert.alert("Error creating task");
    }
  };

  const handleUpdateTask = async (taskId: string, status: string) => {
    try {
      const resp = await updateTaskStatus(taskId, status);
      handleRefresh();
      console.log("task updated", resp);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Error updating the task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const resp = await deleteTaskById(taskId);
      handleRefresh();
      console.log("task deleted successfully", resp);
    } catch (error) {
      Alert.alert("Error deleting task", error);
    }
  };

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
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"white"} />
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={projectName} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <View style={{ backgroundColor: "white", flex: 1 }}>
        {tasks && tasks?.length <= 0 && (
          <Text variant="bodyMedium" style={styles.info}>
            You do not have any tasks yet.
          </Text>
        )}

        <FlatList
          data={tasks}
          renderItem={renderItem}
          contentContainerStyle={styles.tasksContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />

        <TaskFormModal
          title="Create New Task"
          visible={taskFormVisible}
          onDismissCb={() => setTaskFormVisible(false)}
          onSubmit={handleCreateTask}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setTaskFormVisible(true)}
        />
      </View>
    </>
  );
};

export default Project;
