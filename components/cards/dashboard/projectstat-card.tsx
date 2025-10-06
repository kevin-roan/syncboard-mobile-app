import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  activeCount: number;
  completedCount: number;
  memberCount: number;
}

const stats = [
  {
    label: 'Active',
    iconName: 'heart',
    countKey: 'activeCount',
  },
  {
    label: 'Completed',
    iconName: 'checkmark-done-circle-outline',
    countKey: 'completedCount',
  },
  {
    label: 'Members',
    iconName: 'people',
    countKey: 'memberCount',
  },
];

const ProjectStatCard: React.FC<Props> = ({ activeCount, completedCount, memberCount }) => {
  const counts = { activeCount, completedCount, memberCount };

  return (
    <View className="flex-1 rounded-3xl bg-card p-4 px-6">
      <Text className="font-medium text-muted">Project</Text>
      {stats.map(({ label, iconName, countKey }) => (
        <ItemWrapper key={label}>
          <Ionicons name={iconName} size={14} color="white" />
          <Text className="font-light text-white">
            {counts[countKey]} {label}
          </Text>
        </ItemWrapper>
      ))}
    </View>
  );
};

const ItemWrapper = ({ children }: { children: React.ReactNode }) => {
  return <View className="mt-2 flex-row items-center gap-2">{children}</View>;
};

export default ProjectStatCard;
