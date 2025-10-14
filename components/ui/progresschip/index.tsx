import { TouchableOpacity, useColorScheme, TouchableOpacityProps } from 'react-native';
import { Text } from '@/components/ui/text';
import Entypo from '@expo/vector-icons/Entypo';
import { THEME } from '@/lib/theme';
import React from 'react';

interface Props extends TouchableOpacityProps {
  status: 'in_progress' | 'completed' | 'todo';
}

const ProgressChip = React.forwardRef<TouchableOpacity, Props>(
  ({ status, onPress, ...rest }, ref) => {
    const scheme = useColorScheme();

    const statusColors = {
      in_progress: THEME[scheme].warning,
      completed: THEME[scheme].success,
      todo: THEME[scheme].muted,
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        className="flex-row items-center gap-2 rounded-full bg-input px-2 ps-4"
        {...rest}>
        <Text style={{ color: statusColors[status] }}>{status}</Text>
        <Entypo name="chevron-small-down" size={20} color={THEME[scheme].muted} />
      </TouchableOpacity>
    );
  }
);

export default ProgressChip;
