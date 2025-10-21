import { TouchableOpacity, useColorScheme, TouchableOpacityProps } from 'react-native';
import { Text } from '@/components/ui/text';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { THEME } from '@/lib/theme';
import React from 'react';

interface Props extends TouchableOpacityProps {
  status: 'in_progress' | 'completed' | 'todo' | 'wont_do';
}

const ProgressChip = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, Props>(
  ({ status, onPress, ...rest }, ref) => {
    const scheme = useColorScheme();

    const statusColors = {
      in_progress: THEME[scheme].warning,
      completed: THEME[scheme].success,
      todo: THEME[scheme].muted,
      wont_do: THEME[scheme].destructive,
    };

    const statusIcons = {
      in_progress: 'progress-clock',
      completed: 'check-circle',
      todo: 'dots-horizontal',
      wont_do: 'close-circle',
    };

    const iconName = statusIcons[status];

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        className="border-1 flex-row items-center rounded-full bg-input px-1"
        style={{
          borderRadius: 30,
          borderWidth: 0.5,
          borderColor: '#3D3D3D',
        }}
        {...rest}>
        <MaterialCommunityIcons
          name={iconName}
          size={14}
          color={statusColors[status]}
          className="mr-1"
        />
        <Text style={{ color: statusColors[status] }} className="font-normal">
          {status}
        </Text>
        <Entypo name="chevron-small-down" size={20} color={THEME[scheme].muted} />
      </TouchableOpacity>
    );
  }
);

ProgressChip.displayName = 'ProgressChip';

export default ProgressChip;
