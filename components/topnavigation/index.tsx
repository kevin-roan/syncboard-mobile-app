import * as React from 'react';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { THEME } from '@/lib/theme';
import { TouchableOpacity, useColorScheme, View } from 'react-native';

import { Position } from '@/types/position';

interface Props {
  title: string;
  onBackPress?: () => void;
  onMenuButtonPress?: (position: Position) => void;
}

const TopNavigation: React.FC<Props> = ({ title, onBackPress, onMenuButtonPress }) => {
  const scheme = useColorScheme();
  const router = useRouter();

  const handleBackPress = onBackPress ?? (() => router.back());

  const menuButtonRef = React.useRef(null);

  const handleMenuButtonPress = () => {
    // measure height and stuff
    //  and pass it as callback . *

    if (menuButtonRef.current) {
      menuButtonRef.current.measureInWindow((x, y, width, height) => {
        const position: Position = { x, y: y + height, width };
        onMenuButtonPress(position);
      });
    }
  };

  return (
    <View className="flex-row justify-between">
      <View className="flex-shrink flex-row items-center gap-3">
        <TouchableOpacity onPress={handleBackPress}>
          <FontAwesome6 name="chevron-left" size={18} color={THEME[scheme].muted} />
        </TouchableOpacity>
        <Text
          className="mr-10 flex-shrink text-xl font-light text-[#ccc]"
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity>
          <MaterialCommunityIcons name="bell" size={20} color={THEME[scheme].muted} />
        </TouchableOpacity>
        <TouchableOpacity ref={menuButtonRef} onPress={handleMenuButtonPress}>
          <Entypo name="dots-three-horizontal" size={20} color={THEME[scheme].muted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopNavigation;
