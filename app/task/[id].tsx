import React, { useState, useEffect, useCallback } from "react";
import { StatusBar, RefreshControl, Alert, ScrollView } from "react-native";
import ScreenLayout from "@/provider/screenlayout";
import styles from "./styles";
import { Appbar } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import TaskInfoCard from "@/components/ui/cards/taskinfocard";
import {
  createCommentByTaskId,
  getTaskCommentsByTaskId,
  subscribeToTaskComments,
} from "../services/comment";

import { getTaskInfoById } from "../services/task";
import CommentsCard from "@/components/ui/cards/commentcard";
import { useAuth } from "@/context/authctx";

interface TaskData {
  id: string;
  name: string;
  assigned_to_username?: string;
  created_by_username?: string;
  description?: string;
  created_by_avatar?: string;
  assigned_to_avatar?: string;
}

const Task = () => {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [comments, setComments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { session } = useAuth();

  const userId = session?.user?.id;

  const fetchTaskInfo = useCallback(async () => {
    if (!id) return;
    const data = await getTaskInfoById(id);
    setTaskData(data);
  }, [id]);

  const fetchTaskComments = useCallback(async () => {
    if (!id) return;
    const data = await getTaskCommentsByTaskId(id);
    console.log("retrived comments", data);
    setComments(data);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = subscribeToTaskComments(id, (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    fetchTaskInfo();
    fetchTaskComments();
  }, [fetchTaskInfo, fetchTaskComments]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTaskInfo();
    setRefreshing(false);
  };

  const handleAddComment = async (commentText: string) => {
    try {
      const comment = {
        text: commentText,
        author: userId,
      };
      const res = await createCommentByTaskId(id, comment);
      console.log("comments", res);
      setComments(res[0]);
    } catch (error) {
      console.log("error", error);
      Alert.alert("error adding comment");
    }
  };

  return (
    <ScreenLayout>
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Task Info" />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {taskData && (
          <TaskInfoCard
            key={taskData.id}
            taskName={taskData.name}
            assignedTo={taskData.assigned_to_username || ""}
            assignedBy={taskData.created_by_username || ""}
            taskDescription={taskData.description || ""}
            creatorAvatar={taskData.created_by_avatar}
            assigneeAvatar={taskData.assigned_to_avatar}
          />
        )}
        <CommentsCard onSubmit={handleAddComment} comments={comments} />
      </ScrollView>
    </ScreenLayout>
  );
};

export default Task;
