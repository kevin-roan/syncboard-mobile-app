import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { Text } from '@/components/ui/text';
import AvatarGroup from '@/components/ui/avatargroup';
import DateChip from '@/components/ui/datechip';
import moment from 'moment';
import { useRouter } from 'expo-router';
import ProgressChip from '@/components/ui/progresschip';

interface Props {
  title: string;
}

const TaskCard: React.FC<Props> = ({ title }) => {
  const router = useRouter();

  return (
    <TouchableNativeFeedback
      onPress={() => {}}
      background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.1)', false)}>
      <View className="gap-3 rounded-xl bg-card p-3">
        <Text>React native reanimated implementation, migration docs</Text>
        <View className="flex-row gap-2">
          <AvatarGroup title={'3 People'} onPress={() => {}} />
          <DateChip date={moment().daysInMonth()} />
          <ProgressChip status="in_progress" onPress={() => {}} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default TaskCard;
