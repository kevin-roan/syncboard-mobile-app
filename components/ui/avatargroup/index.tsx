import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Position } from '@/types/position';

interface Props {
  title: string;
  onPress: (position: Position) => void;
}

const AvatarGroup: React.FC<Props> = ({ title, onPress }) => {
  const triggerRef = React.useRef(null);

  const handlePress = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        const position: Position = { x, y: y + height, width };
        onPress(position);
      });
    }
  };

  return (
    <TouchableOpacity
      ref={triggerRef}
      className="flex-row items-center rounded-full bg-input p-0.5"
      onPress={handlePress}>
      <Avatar
        alt="@mrzachnugent"
        className="
        -mr-2 h-4 w-4 border-2 border-background web:border-0 web:ring-2 web:ring-background">
        <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
      <Avatar
        alt="@leerob"
        className="-mr-2 h-4 w-4 border-2 border-background web:border-0 web:ring-2 web:ring-background">
        <AvatarImage source={{ uri: 'https://github.com/leerob.png' }} />
        <AvatarFallback>
          <Text>LR</Text>
        </AvatarFallback>
      </Avatar>{' '}
      <Avatar
        alt="@evilrabbit"
        className="-mr-2 h-4 w-4 border-2 border-background web:border-0 web:ring-2 web:ring-background">
        <AvatarImage source={{ uri: 'https://github.com/evilrabbit.png' }} />
        <AvatarFallback>
          <Text>ER</Text>
        </AvatarFallback>
      </Avatar>
      <Text className="mx-4 text-sm">{title}</Text>
    </TouchableOpacity>
  );
};

export default AvatarGroup;
