import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  title: string;
  onPress: () => void;
}

const AvatarGroup: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center rounded-full bg-input p-0.5"
      onPress={onPress}>
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
