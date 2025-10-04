import * as React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/provider/themeprovider';
import { darkTheme, lightTheme } from '@/constants/theme';

interface Props {
  title: string;
  onDrawerButtonPress: () => void;
}

const DashboardNavigation: React.FC<Props> = ({ title, onDrawerButtonPress }) => {
  const { mode, theme } = useTheme();

  return (
    <View className=" flex flex-row  items-center justify-between bg-background dark:bg-dark-background">
      <View className="flex-row items-center gap-3">
        <Feather
          name="sidebar"
          size={24}
          color={mode === 'light' ? lightTheme.textMuted : darkTheme.textMuted}
          onPress={onDrawerButtonPress}
        />
        <Text className=" text-xl dark:text-textMuted">{title}</Text>
      </View>
      <Feather
        name="search"
        size={20}
        color={mode === 'light' ? lightTheme.textMuted : darkTheme.textMuted}
      />
    </View>
  );
};

export default DashboardNavigation;
