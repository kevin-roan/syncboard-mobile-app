import { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Modal,
  View,
  Alert,
  useColorScheme,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenLayout from '@/provider/screenlayout';
import TopNavigation from '@/components/topnavigation';
import TaskInfoCard from '@/components/cards/taskinfocard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { BlurView } from 'expo-blur';
import Markdown from 'react-native-markdown-display';
import Feather from '@expo/vector-icons/Feather';
import { THEME } from '@/lib/theme';

import type { EnrichedTextInputInstance, OnChangeStateEvent } from 'react-native-enriched';
import { EnrichedTextInput } from 'react-native-enriched';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Position } from '@/types/position';
import { Text } from '@/components/ui/text';
import MinimalAlert from '@/components/alert';
import { useDeleteTask, useGetTaskMetaData, useGetTasks, useUpdateTask } from '@/hooks/tasks/useTask';


const dummyMarkdown = `# h1 Heading 8-)

 **This is some bold text!**
  - Task Info 1

 This is normal text
 `;

const TaskInfo = () => {
  const scheme = useColorScheme();
  const router = useRouter()

  const { id, taskName, taskStatus ,projectId:prId} = useLocalSearchParams();
  const taskId= Array.isArray(id) ? id[0] :id 
  const projectId = Array.isArray(prId) ? prId[0] : prId



const { data: tasks } = useGetTasks(projectId);
const task = tasks?.find(t => t.id === taskId);

  const {data:taskMetaData,error} = useGetTaskMetaData(taskId,projectId)

  const {mutate:deleteTaskMutation} = useDeleteTask()

  const {
    mutate: updateTask,
    isPending,
    isError,
    error: updateTaskError,
  } = useUpdateTask(projectId);

  const ref = useRef<EnrichedTextInputInstance>(null);


  const [isEditing, setEditing] = useState<boolean>(true);

  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const [taskMenuDropdownVisible, settaskMenuDropdownVisible] = useState<boolean>(false);
  const [taskMenuDropdownPosition, settaskMenuDropdownPosition] = useState<Position>({
    x: 0,
    y: 0,
    width: 0,
  });

  const [markdownData, setMarkdownData] = useState<string>(dummyMarkdown);

  const [htmlData, setHtmlData] = useState('');

  const toggleEditingMode = () => {
    setEditing(!isEditing);
    setMarkdownData(htmlData);
  };

  const handleChangeTaskInfo = (data) => {
    setHtmlData(data.nativeEvent.value);
  };

  const triggerDeleteDropdown = (position: Position) => {
    console.log('position', position);
    settaskMenuDropdownVisible(!taskMenuDropdownVisible);
    settaskMenuDropdownPosition(position);
  };

  const handleDeleteTask  = () =>{

    deleteTaskMutation({taskId},{
      onSuccess:() => {
                settaskMenuDropdownVisible(false)
              setDeleteModalVisible(!deleteModalVisible)
        router.back();
      },
      onError:()=>{
        console.error('error deleting task',error)
        Alert.alert("Error deleting Task")
      }
    })


  }

  const handleUpdateTask = ( updates: Partial<Task>) => {
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
    <ScreenLayout style={{ flex: 1 }}>
      <LinearGradient
        colors={[THEME[scheme][task.status ?? 'todo'], 'transparent']}
        style={styles.background}
        locations={[0.1, 0.6]}
      />

      <TopNavigation title={task.name} onMenuButtonPress={triggerDeleteDropdown} />

      <TaskInfoCard
 assignedUsers={[
    taskMetaData?.created_by_username && {
      username: taskMetaData.created_by_username,
      avatarUrl: taskMetaData.created_by_avatar,
    },
    taskMetaData?.assigned_to_username && {
      username: taskMetaData.assigned_to_username,
      avatarUrl: taskMetaData.assigned_to_avatar,
    },
  ].filter(Boolean)}

        status={task.status}
        onTaskChange={handleUpdateTask}
        dueDate={task.due}
      />
      <View className="flex-row justify-end">
        {isEditing ? (
          <TouchableOpacity onPress={toggleEditingMode}>
            <MaterialIcons name="edit-off" size={20} color={THEME[scheme].muted} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleEditingMode}>
            <Feather name="edit-2" size={20} color={THEME[scheme].muted} />
          </TouchableOpacity>
        )}
      </View>

      {!isEditing ? (
        <Markdown style={markdownStyles}>{markdownData}</Markdown>
      ) : (
        <>
          <EnrichedTextInput
            ref={ref}
            // onChangeState={(e) => setStylesState(e.nativeEvent)}
            // style={styles.input}
            onChangeText={handleChangeTaskInfo}
            defaultValue={markdownData}
          />

          <View style={{ marginBottom: 40 }}></View>
        </>
      )}

      {
        // all the modals
      }

      <Modal
        transparent
        animationType="fade"
        visible={taskMenuDropdownVisible}
        onRequestClose={() => settaskMenuDropdownVisible(false)}>
        <Pressable className="flex-1" onPress={() => settaskMenuDropdownVisible(false)}>
          <View
            className="bg-card "
            style={[
              styles.deleteDropdown,
              {
                top: taskMenuDropdownPosition.y,
                start: taskMenuDropdownPosition.x - 179,
                width: 200,
              },
            ]}>
            <TouchableOpacity className="flex-row items-center justify-between rounded-md rounded-bl-none rounded-br-none bg-popover p-1">
              <Text className="text-sm text-muted">Share</Text>
              <MaterialIcons name="ios-share" size={18} color={THEME[scheme].muted} />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-between rounded-md p-1"
              onPress={handleDeleteTask}>
              <Text className="text-sm text-muted">Delete</Text>
              <MaterialIcons name="delete" size={18} color="darkred" />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {
        // delete  task  modal
      }
      <Modal visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}>
      >
      <BlurView intensity={3} style={{
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
        }}
          tint='dark'
          experimentalBlurMethod='dimezisBlurView'
          >
        <Pressable
          className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.7)]'
        >

          <MinimalAlert info="Confirm that you want to delete this Task. This cannot be undone" 
              onCancel={() => setDeleteModalVisible(false)}
              onSubmit={handleDeleteTask}
              submitButtonText='Delete Task'
              submitButtonIcon={ <MaterialIcons name="delete" size={18} color="darkred" /> }

            />
        </Pressable>
      </BlurView>
      </Modal>
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

  deleteDropdown: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#3D3D3D',
    elevation: 10,
    shadowColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.8)' : '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
  },

});

const markdownStyles = {
  body: {
    color: '#fff',
  },
  heading1: {
    color: '#fff',
  },
  strong: {
    color: '#fff',
  },
  bullet_list: {
    color: '#fff',
  },
};

//
// DO NOT REMOVE THIS
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
