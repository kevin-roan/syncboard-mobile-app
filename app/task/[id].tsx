import * as React from 'react';
import ScreenLayout from '@/provider/screenlayout';
import { LinearGradient } from 'expo-linear-gradient';

import { StyleSheet } from 'react-native';
import TopNavigation from '@/components/ui/navbar/navheader';
import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';
import Markdown from 'react-native-markdown-display';

const copy = `# h1 Heading 8-)

**This is some bold text!**
 - Task Info  1

This is normal text
`;

const TaskInfo = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: copy,
  });

  return (
    <ScreenLayout>
      <LinearGradient
        colors={['rgba(102, 51, 0, 0.9)', 'transparent']}
        style={styles.background}
        locations={[0.1, 0.6]}></LinearGradient>

      <TopNavigation title="React Native Reanimated " />
      <Markdown>{copy}</Markdown>
      <RichText
        editor={editor}
        style={{
          backgroundColor: 'transparent',
        }}
      />
    </ScreenLayout>
  );
};

export default TaskInfo;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import React, { useState, useEffect, useCallback } from 'react';
// import { StatusBar, RefreshControl, Alert, ScrollView } from 'react-native';
// import ScreenLayout from '@/provider/screenlayout';
// import styles from './styles';
// import { Appbar } from 'react-native-paper';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import TaskInfoCard from '@/components/cards/taskinfocard';
// import {
//   createCommentByTaskId,
//   getTaskCommentDetailsByCommentId,
//   getTaskCommentsByTaskId,
//   subscribeToTaskComments,
// } from '../../services/comment';
//
// import { getTaskInfoById } from '../../services/task';
// import CommentsCard from '@/components/cards/commentcard';
// import { useAuth } from '@/context/authctx';
//
// interface TaskData {
//   id: string;
//   name: string;
//   assigned_to_username?: string;
//   created_by_username?: string;
//   description?: string;
//   created_by_avatar?: string;
//   assigned_to_avatar?: string;
// }
//
// const Task = () => {
//   const [taskData, setTaskData] = useState<TaskData | null>(null);
//   const [comments, setComments] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const router = useRouter();
//   const { id: taskId } = useLocalSearchParams<{ id?: string }>();
//   const { session } = useAuth();
//
//   const userId = session?.user?.id;
//
//   const fetchTaskInfo = useCallback(async () => {
//     if (!taskId) return;
//     const data = await getTaskInfoById(taskId);
//     setTaskData(data);
//   }, [taskId]);
//
//   const fetchTaskComments = useCallback(async () => {
//     if (!taskId) return;
//     const data = await getTaskCommentsByTaskId(taskId);
//     console.log('retrived comments', data);
//     setComments(data);
//   }, [taskId]);
//
//   const fetchNewCommentsByCommentId = async (commentId: string) => {
//     if (!commentId) return;
//     const newComment = await getTaskCommentDetailsByCommentId(commentId);
//     setComments((prev) => [...prev, newComment]);
//   };
//
//   // subscribe to comments
//   useEffect(() => {
//     if (!taskId) return;
//
//     const unsubscribe = subscribeToTaskComments(taskId, (comment) => {
//       fetchNewCommentsByCommentId(comment.id);
//       // setComments((prev) => [...prev, comment]);
//     });
//
//     return () => unsubscribe();
//   }, [taskId]);
//
//   useEffect(() => {
//     fetchTaskInfo();
//     fetchTaskComments();
//   }, [fetchTaskInfo, fetchTaskComments]);
//
//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchTaskInfo();
//     setRefreshing(false);
//   };
//
//   const handleAddComment = async (commentText: string) => {
//     try {
//       const comment = {
//         content: commentText,
//         user_id: userId,
//       };
//       const res = await createCommentByTaskId(taskId, comment);
//       console.log('comments', res);
//       if (res && res.length > 0) {
//         setComments((prev) => [...prev, res[0]]);
//       }
//     } catch (error) {
//       console.log('error', error);
//       Alert.alert('error adding comment');
//     }
//   };
//
//   return (
//     <ScreenLayout>
//       <StatusBar barStyle="light-content" backgroundColor="white" />
//       <Appbar.Header elevated>
//         <Appbar.BackAction onPress={() => router.back()} />
//         <Appbar.Content title="Task Info" />
//         <Appbar.Action icon="refresh" onPress={handleRefresh} />
//       </Appbar.Header>
//
//       <ScrollView
//         contentContainerStyle={styles.container}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
//         {taskData && (
//           <TaskInfoCard
//             key={taskData.id}
//             taskName={taskData.name}
//             assignedTo={taskData.assigned_to_username || ''}
//             assignedBy={taskData.created_by_username || ''}
//             taskDescription={taskData.description || ''}
//             creatorAvatar={taskData.created_by_avatar}
//             assigneeAvatar={taskData.assigned_to_avatar}
//           />
//         )}
//         <CommentsCard onSubmit={handleAddComment} comments={comments} />
//       </ScrollView>
//     </ScreenLayout>
//   );
// };
//
// export default Task;
