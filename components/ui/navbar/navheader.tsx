import * as React from 'react';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { THEME } from '@/lib/theme';
import { TouchableOpacity, useColorScheme, View } from 'react-native';

interface Props {
  title: string;
  onBackPress?: () => void;
}

const TopNavigation: React.FC<Props> = ({ title, onBackPress }) => {
  const scheme = useColorScheme();
  const router = useRouter();

  const handleBackPress = onBackPress ?? (() => router.back());
  return (
    <View className="flex-row justify-between">
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={handleBackPress}>
          <FontAwesome6 name="chevron-left" size={18} color={THEME[scheme].muted} />
        </TouchableOpacity>
        <Text className="text-xl font-light text-[#ccc]">{title}</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity>
          <MaterialCommunityIcons name="bell" size={20} color={THEME[scheme].muted} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={20} color={THEME[scheme].muted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopNavigation;
