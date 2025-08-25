import React, { useState, useEffect } from "react";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import { Text, Appbar, Button, FAB } from "react-native-paper";
import styles from "./styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useApp } from "@/context/appctx";
import { createTask, getTasks } from "@/app/services/task";
import ModalForm from "@/components/ui/modals/modalform";
import { useAuth } from "@/context/authctx";
import TaskCard from "@/components/ui/cards/taskcard";

const Project = () => {
  const router = useRouter();
  const { id, projectName } = useLocalSearchParams();
  const auth = useAuth();
  const { workspace } = useApp();

  const userId = auth?.session?.user?.id;

  const [tasks, setTasks] = useState([]);
  const [taskFormVisible, setTaskFormVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const resp = await getTasks(id);
        setTasks(resp);
        setRefreshing(false);
      } catch (error) {
        console.log("error fetching tasks");
        Alert.alert("error fetching tasks");
      }
    };

    fetchTasks();
  }, [refreshing]);

  const handleCreateTask = async (taskName: string) => {
    try {
      const payload = {
        name: taskName,
        project_id: id,
        created_by: userId,
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

  const renderItem = ({ item, index }) => {
    return (
      <TaskCard
        key={index}
        title={item.name}
        status="todo"
        description="completed task descriptoin "
      />
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
  };

  return (
    <>
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

        <ModalForm
          visible={taskFormVisible}
          title="Enter task name"
          textinputPlaceholder="Enter task name"
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

