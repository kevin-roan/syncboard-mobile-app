import * as React from 'react';
import { View, useColorScheme } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';

interface Props {
  workspaceName: string;
  totalProjectsCount: number;
  completedProjectsCount: number;
  archivedProjectsCount: number;
}

const WorkspaceCard: React.FC<Props> = ({
  workspaceName,
  totalProjectsCount,
  completedProjectsCount,
  archivedProjectsCount,
}) => {
  const scheme = useColorScheme();
  return (
    <View className="rounded-xl border-[0.5px] border-border bg-card p-3">
      <Text className="font-regular text-lg text-white">{workspaceName}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-sm text-info ">{totalProjectsCount ?? 0} Total Project</Text>
          <Text className="text-sm  text-success">{completedProjectsCount ?? 0} Total Project</Text>
          <Text className="text-sm  text-destructive">
            {archivedProjectsCount ?? 0} Total Project
          </Text>
        </View>
        <MaterialIcons name="delete-forever" size={24} color={THEME[scheme].destructive} />
      </View>
    </View>
  );
};

export default WorkspaceCard;
