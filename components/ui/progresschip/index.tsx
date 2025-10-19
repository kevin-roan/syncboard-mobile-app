import { TouchableOpacity, useColorScheme, TouchableOpacityProps } from 'react-native';
import { Text } from '@/components/ui/text';
import Entypo from '@expo/vector-icons/Entypo';
import { THEME } from '@/lib/theme';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
        className="border-1 flex-row items-center gap-2 rounded-full bg-input
        px-2
        "

        style={{
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#3D3D3D',
        }}

        {...rest}>
        <MaterialCommunityIcons name="progress-check" size={16} color={statusColors[status]} />
        <Text style={{ color: statusColors[status] }} className="font-normal">
          {status}
        </Text>
        <Entypo name="chevron-small-down" size={20} color={THEME[scheme].muted} />
      </TouchableOpacity>
    );
  }
);

export default ProgressChip;
