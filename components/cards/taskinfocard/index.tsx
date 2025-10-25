import * as React from 'react';
import { TouchableOpacity, Modal, Pressable, useColorScheme, View } from 'react-native';
import { Text } from '@/components/ui/text';
import UserChip from '@/components/ui/userchip';
import DateChip from '@/components/ui/datechip';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProgressChip from '@/components/ui/progresschip';
import { THEME } from '@/lib/theme';
import { Position } from '@/types/position';
import { Status } from '@/types/status';
import TaskStatusDropdown from '@/components/dropdown/taskstatusdropdown';

// TODO;
// handle users > 2

interface AssingedUsers {
  username: string;
  avatarUrl: string;
}

interface Props {
  assignedUsers: AssingedUsers[];
  dueDate: string;
  status: Status;
  onTaskChange: (updates: { [key: string]: any }) => void;
}

const TaskInfoCard: React.FC<Props> = ({ assignedUsers, dueDate, status, onTaskChange }) => {
  const [statusTriggerPosition, setStatusTriggerPosition] = React.useState<Position>({
    x: 0,
    y: 0,
    width: 0,
  });
  const [statusDropdownVisible, setStatusDropdownVisible] = React.useState<boolean>(false);

  const scheme = useColorScheme();

  const triggerRef = React.useRef(null);

  // todo
  /// can refactor this by moving this into the progresschip and just passing the position.
  const toggleModal = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setStatusTriggerPosition({ x, y: y + height, width });
        setStatusDropdownVisible(true);
      });
    } else {
      setStatusDropdownVisible(true);
    }
  };

  const handleSetStatus = (status: string) => {
    setStatusDropdownVisible(false);
    onTaskChange({ status: status });
  };

  const handleSetDate = (dateObj: { date: string }) => {
    onTaskChange(dateObj);
  };
  console.log('assingedusers', assignedUsers);

  return (
    <View className="my-4 gap-2 rounded-xl bg-card p-3">
      <View className="gap-1">
        <Label label="Assigned To" />
        <View className="flex-row gap-3 overflow-hidden">
          {assignedUsers.map((item, index) => {
            if (index >= 2) return null;
            return (
              <UserChip
                key={index}
                username={item?.username ?? ''}
                avatarUrl={item.avatarUrl ?? null}
              />
            );
          })}
          <TouchableOpacity className="rounded-full bg-input p-1">
            <Ionicons name="add-sharp" size={12} color={THEME[scheme].muted} className="m-auto" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row justify-between">
        <View className="gap-1">
          <Label label="Due Date" />
          <DateChip date={dueDate} onPress={handleSetDate} />
        </View>
        <View className="flex-row items-center gap-2 self-end">
          <Label label="Status" />
          <ProgressChip status={status} onPress={toggleModal} ref={triggerRef} />
        </View>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={statusDropdownVisible}
        onRequestClose={() => setStatusDropdownVisible(false)}>
        <Pressable style={{ flex: 1 }} onPress={() => setStatusDropdownVisible(false)}>
          <TaskStatusDropdown
            taskStatusList={['todo', 'in_progress', 'wont_do', 'completed']}
            onTaskUpdate={handleSetStatus}
            selectedStatus={status}
            position={statusTriggerPosition}
          />
        </Pressable>
      </Modal>
    </View>
  );
};

const Label = ({ label }: { label: string }) => {
  return <Text className="text-sm font-light text-muted">{label}</Text>;
};

export default TaskInfoCard;
