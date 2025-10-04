import * as React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

interface Props {
  avatarUrl: string;
  usernameIntial: string;
}

const ProfilePictureCard: React.FC<Props> = ({ avatarUrl, usernameIntial }) => {
  return (
    <View className="items-center justify-center rounded-3xl bg-card p-4">
      <Text className="dark:text-textMuted self-start text-xl font-light text-muted">
        Profile Picture
      </Text>
      <Avatar alt="Username's Avatar" className="my-10 h-32 w-32">
        <AvatarImage source={{ uri: avatarUrl }} />
        <AvatarFallback>
          <Text className="text-4xl">{usernameIntial}</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
};

export default ProfilePictureCard;
