import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

interface TaskStat {
  label: string;
  countKey: keyof Props;
  color: string;
}

interface Props {
  totalCount: number;
  inProgressCount: number;
  wontDoCount: number;
  completedCount: number;
}

const taskStats: TaskStat[] = [
  { label: 'Total Tasks', countKey: 'totalCount', color: '#b3b3b3' },
  { label: 'In progress', countKey: 'inProgressCount', color: '#d18b09' },
  { label: 'Completed', countKey: 'completedCount', color: '#557618' },
];

interface ColoredDotProps {
  color: string;
}

const ColoredDot: React.FC<ColoredDotProps> = ({ color }) => (
  <View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: color, marginRight: 8 }} />
);

interface ItemWrapperProps {
  children: React.ReactNode;
}

const ItemWrapper: React.FC<ItemWrapperProps> = ({ children }) => (
  <View className="mt-2 flex-row items-center gap-2">{children}</View>
);

const TaskStatCard: React.FC<Props> = ({
  totalCount,
  inProgressCount,
  wontDoCount,
  completedCount,
}) => {
  const counts = { totalCount, inProgressCount, wontDoCount, completedCount };

  return (
    <View className="flex-1 rounded-3xl bg-card p-4 px-6">
      <Text className="font-medium text-muted">Tasks</Text>
      {taskStats.map(({ label, countKey, color }) => (
        <ItemWrapper key={label}>
          <ColoredDot color={color} />
          <Text
            style={{ color, fontWeight: label === 'Tasks' ? '500' : '400' }}
            className="text-sm">
            {counts[countKey]} {label}
          </Text>
        </ItemWrapper>
      ))}
    </View>
  );
};

export default TaskStatCard;
