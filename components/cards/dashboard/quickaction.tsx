import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';

interface QuickActionProps {
  icon: string;
  title: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title }) => (
  <TouchableOpacity className="flex-1 items-center justify-center rounded-2xl bg-card p-3 pt-4">
    <Ionicons name={icon} size={20} color="#C2C2C2" />
    <Text className="mt-4 text-sm font-light tracking-wide text-muted">{title}</Text>
  </TouchableOpacity>
);

const quickActions = [
  { icon: 'bookmark-outline', title: 'Backlog' },
  { icon: 'people', title: 'Members' },
  { icon: 'albums-outline', title: 'Projects' },
  { icon: 'checkmark-circle-outline', title: 'To triage' },
];

const DashboardQuickActions = () => (
  <View className="flex-row gap-3">
    {quickActions.map(({ icon, title }) => (
      <QuickAction key={title} icon={icon} title={title} />
    ))}
  </View>
);

export default DashboardQuickActions;
