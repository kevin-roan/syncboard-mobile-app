import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/provider/themeprovider';
import Octicons from '@expo/vector-icons/Octicons';
import { darkTheme, lightTheme } from '@/constants/theme';

interface Props {
  title: string;
  onDrawerButtonPress: () => void;
}

const DashboardNavigation: React.FC<Props> = ({ title, onDrawerButtonPress }) => {
  const { mode, theme } = useTheme();

  return (
    <View className=" bg-dark flex   flex-row items-center justify-between bg-background pb-3">
      <View className="flex-row items-center gap-3">
        <Feather
          name="sidebar"
          size={19}
          color={mode === 'light' ? lightTheme.textMuted : darkTheme.textMuted}
          onPress={onDrawerButtonPress}
        />
        <Text className="text-lg font-light text-info">{title}</Text>
      </View>

      <Octicons
        name="search"
        size={19}
        color={mode === 'light' ? lightTheme.textMuted : darkTheme.textMuted}
      />
    </View>
  );
};

export default DashboardNavigation;
