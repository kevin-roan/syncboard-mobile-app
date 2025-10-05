import * as React from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/text';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProgressBar from '@/components/progressbar';
import moment from 'moment';
import { THEME } from '@/lib/theme';

interface Props {
  title: string;
  description: string;
  onPress: () => void;
  createdAt: string;
  createdBy: string;
  totalTaskCount: number;
  completedTaskCount: number;
  inProgressTaskCount: number;
}

interface TaskStat {
  label: string;
  countKey: keyof Props;
  color: string;
}

const taskStats: TaskStat[] = [
  { label: 'Total Tasks', countKey: 'totalTaskCount', color: '#b3b3b3' },
  { label: 'In progress', countKey: 'completedTaskCount', color: '#d18b09' },
  { label: 'Completed', countKey: 'inProgressTaskCount', color: '#557618' },
];

const ProjectCard: React.FC<Props> = ({
  title,
  description,
  onPress,
  createdAt,
  createdBy,
  totalTaskCount,
  completedTaskCount,
  inProgressTaskCount,
}) => {
  const scheme = useColorScheme();
  const counts = { totalTaskCount, completedTaskCount, inProgressTaskCount };
  return (
    <TouchableOpacity onPress={() => onPress ?? null} className="gap-1 rounded-2xl bg-card p-4">
      <View className="flex-row items-center gap-2">
        <MaterialCommunityIcons name="tree" size={30} color={THEME[scheme].foreground} />
        <View className="flex-shrink">
          <Text className="p-0 text-lg" numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text className="text-sm text-muted" numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-3">
        <Text className="text-sm">Created on {moment(createdAt).format('DD MMM YYYY')}</Text>
        <Text className="text-sm">By{createdBy}</Text>
      </View>
      <View className="flex-row">
        {taskStats.map((item, index) => (
          <View key={index} className="mr-3 flex-row items-center ">
            <ColoredDot color={item.color} />
            <Text className="text-[12px] text-muted ">{item.label}</Text>
            <Text className="text-[12px] text-muted ">{counts[item.countKey]}</Text>
          </View>
        ))}
      </View>
      <ProgressBar
        progressSegments={[
          { color: '#d33b2f', percentage: 0.1 },
          { color: '#d18b09', percentage: 0.3 },
          { color: '#557618', percentage: 0.4 },
          { color: '#b3b3b3', percentage: 0.2 },
        ]}
      />
    </TouchableOpacity>
  );
};

interface ColoredDotProps {
  color: string;
}

const ColoredDot: React.FC<ColoredDotProps> = ({ color }) => (
  <View style={{ width: 4, height: 4, borderRadius: 5, backgroundColor: color, marginRight: 8 }} />
);

export default ProjectCard;
