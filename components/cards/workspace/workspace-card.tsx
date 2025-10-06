import * as React from 'react';
import { View, useColorScheme, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { useRouter } from 'expo-router';

interface Props {
  workspaceId: string;
  workspaceName: string;
  totalProjectsCount: number;
  completedProjectsCount: number;
  archivedProjectsCount: number;
}

const WorkspaceCard: React.FC<Props> = ({
  workspaceId,
  workspaceName,
  totalProjectsCount,
  completedProjectsCount,
  archivedProjectsCount,
}) => {
  const scheme = useColorScheme();
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/workspace/${workspaceId}`);
  };

  return (
    <TouchableOpacity
      className="rounded-xl border-[0.5px] border-border bg-card p-3"
      onPress={handleNavigation}>
      <Text className="font-regular text-lg text-white">{workspaceName}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-sm text-info ">{totalProjectsCount ?? 0} Total Projects</Text>
          <Text className="text-sm  text-success">{completedProjectsCount ?? 0} Active</Text>
          <Text className="text-sm  text-destructive">{archivedProjectsCount ?? 0} Archived</Text>
        </View>
        <MaterialIcons name="delete-forever" size={24} color={THEME[scheme].destructive} />
      </View>
    </TouchableOpacity>
  );
};

export default WorkspaceCard;
