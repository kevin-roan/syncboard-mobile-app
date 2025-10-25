import { useState, useRef } from 'react';
import { View, TouchableNativeFeedback, Modal, Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import AvatarGroup from '@/components/ui/avatargroup';
import DateChip from '@/components/ui/datechip';
import moment from 'moment';
import ProgressChip from '@/components/ui/progresschip';
import { Position } from '@/types/position';
import TaskStatusDropdown from '@/components/dropdown/taskstatusdropdown';
import { statusList } from '@/constants/taskList';
import { Task } from '@/types/task';

interface Props {
  task: Task;
  onPress: () => void;
  onTaskChange: (taskId: string, update: { [key: string]: any }) => void;
}

const TaskCard: React.FC<Props> = ({ task, onPress, onTaskChange }) => {
  const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [progressPosition, setProgressPosition] = useState<Position>({ x: 0, y: 0, width: 0 });

  const [userDropdownVisible, setUserDropdownVisible] = useState<boolean>(false);
  const [userDropdownPosition, setUserDropDownPosition] = useState<Position>({
    x: 0,
    y: 0,
    width: 0,
  });

  const triggerRef = useRef(null);

  const toggleModal = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setProgressPosition({ x: x + 30, y: y + height, width });
        setStatusDropdownVisible(true);
      });
    } else {
      setStatusDropdownVisible(true);
    }
  };

  const handleSetStatus = (status: string) => {
    setStatusDropdownVisible(false);
    onTaskChange(task.id, { status: status });
  };

  const handleSetDate = (dateObj: { date: string }) => {
    onTaskChange(task.id, dateObj);
  };

  const handleShowUserDropdown = (position: Position) => {
    setUserDropdownVisible(!userDropdownVisible);
    setUserDropDownPosition(position);
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.1)', false)}>
        <View className="gap-3 rounded-xl bg-card p-3">
          <View>
            <Text>{task.name}</Text>
            {task.description && (
              <Text variant={'p'} className="text-sm text-muted">
                {task.description}
              </Text>
            )}
          </View>
          <View className="flex-row flex-wrap gap-2">
            <AvatarGroup title={'2 People'} onPress={handleShowUserDropdown} />
            <View className=" flex-row gap-2">
              <DateChip date={moment(task.due).format('DD MMM')} onPress={handleSetDate} />
              <ProgressChip ref={triggerRef} status={task.status} onPress={toggleModal} />
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>

      <Modal
        transparent
        animationType="fade"
        visible={statusDropdownVisible}
        onRequestClose={() => setStatusDropdownVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setStatusDropdownVisible(false)}>
          <TaskStatusDropdown
            taskStatusList={statusList}
            position={progressPosition}
            selectedStatus={task.status}
            onTaskUpdate={handleSetStatus}
          />
        </Pressable>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={userDropdownVisible}
        onRequestClose={() => setUserDropdownVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setUserDropdownVisible(false)}>
          <View
            style={[
              styles.popup,
              {
                top: userDropdownPosition.y + 10,
                left: userDropdownPosition.x,
                width: 200,
                padding: 0,
                borderRadius: 14,
              },
            ]}>
            {/*

            <AddUserDropdown />
          */}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  popup: {
    position: 'absolute',
    backgroundColor: '#2B2B2B',
    padding: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#3D3D3D',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default TaskCard;
