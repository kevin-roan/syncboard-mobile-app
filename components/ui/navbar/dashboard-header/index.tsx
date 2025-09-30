import * as React from 'react';
import { View, Text } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useTheme } from '@/provider/themeprovider';

interface Props {
  title: string;
  onDrawerButtonPress: () => void;
}

const DashboardNavigation: React.FC<Props> = ({ title, onDrawerButtonPress }) => {
  const { theme } = useTheme();

  return (
    <View className=" flex flex-row bg-background dark:bg-dark-background">
      <Text className="text-dark-background">{title}</Text>
      <EvilIcons name="search" color={theme.surfaceSecondary} size={20} />
    </View>
  );
};

export default DashboardNavigation;
