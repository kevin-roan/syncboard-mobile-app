import * as React from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { Text } from '@/components/ui/text';
import UserChip from '@/components/ui/userchip';
import DateChip from '@/components/ui/datechip';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProgressChip from '@/components/ui/progresschip';
import { THEME } from '@/lib/theme';

// TODO;
// handle users > 2

interface AssingedUsers {
  username: string;
  avatarUrl: string;
}

interface Props {
  assignedUsers: [AssingedUsers];
  dueDate: string;
  status: string;
  onStatusChange: (status: string) => void;
}

const TaskInfoCard: React.FC<Props> = ({ assignedUsers, dueDate, status, onStatusChange }) => {
  const scheme = useColorScheme();

  return (
    <View className="my-4 gap-2 rounded-xl bg-card p-3">
      <View className="gap-1">
        <Label label="Assigned To" />
        <View className="flex-row gap-3 overflow-hidden">
          {assignedUsers.map((item, index) => {
            if (index >= 2) return null;
            return <UserChip key={index} username={item.username} />;
          })}
          <TouchableOpacity className="rounded-full bg-input p-1">
            <Ionicons name="add-sharp" size={12} color={THEME[scheme].muted} className="m-auto" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row justify-between">
        <View className="gap-1">
          <Label label="Due Date" />
          <DateChip date={dueDate} />
        </View>
        <View className="flex-row items-center gap-2 self-end">
          <Label label="Status" />
          <ProgressChip status={status} onPress={onStatusChange} />
        </View>
      </View>
    </View>
  );
};

const Label = ({ label }: { label: string }) => {
  return <Text className="text-sm font-light text-muted">{label}</Text>;
};

export default TaskInfoCard;
