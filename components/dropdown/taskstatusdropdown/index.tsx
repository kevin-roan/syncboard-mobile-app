import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';

import { Status } from '@/types/status';
import { Position } from '@/types/position';
import styles from '@/styles/global';

interface Props {
  taskStatusList: Status[];
  onTaskUpdate: (status: Status) => void;
  position: Position;
  selectedStatus: Status;
}

const TaskStatusDropdown: React.FC<Props> = ({
  taskStatusList,
  onTaskUpdate,
  position,
  selectedStatus,
}) => {
  return (
    <View
      className="rounded-sm bg-input p-2"
      style={[
        styles.popup,
        {
          top: position.y + 4,
          left: position.x - 110,
          width: 200,
        },
      ]}>
      {taskStatusList.map((status, index) => (
        <TaskStatusChip
          title={status}
          key={index}
          onPress={() => onTaskUpdate(status)}
          selected={status === selectedStatus}
        />
      ))}
    </View>
  );
};

interface TaskStatusChipProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const TaskStatusChip: React.FC<TaskStatusChipProps> = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity className={`rounded-sm  px-2 ${selected && 'bg-input'}`} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default TaskStatusDropdown;
