import * as React from 'react';
import { TouchableOpacity, useColorScheme, View, Alert } from 'react-native';
import { Text } from '@/components/ui/text';
import { getInitials } from '@/utils/getInitials';
import Ionicons from '@expo/vector-icons/Ionicons';
import { THEME } from '@/lib/theme';
import moment from 'moment';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserInfo {
  user_id: string;
  role: string;
  username: string;
  email: string;
  joined_at: string;
  avatar_url?: string;
}

const UserinfoCard: React.FC<UserInfo> = ({
  user_id,
  username,
  email,
  role,
  joined_at,
  avatar_url,
}) => {
  const scheme = useColorScheme();
  const usernameIntial = getInitials(username);

  const handleRemoveUser = () => {
    Alert.alert(
      'Remove User',
      'Do you want to remove this user?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  };
  return (
    <View className="flex-row items-center rounded-2xl bg-card p-3">
      <View className="flex-1 flex-row items-center gap-3">
        <Avatar alt="Username's Avatar" className=" h-10 w-10">
          <AvatarImage source={{ uri: avatar_url }} />
          <AvatarFallback>
            <Text className="text-2xl">{usernameIntial}</Text>
          </AvatarFallback>
        </Avatar>
        <View className="gap-0">
          <Text>{username}</Text>
          <Text className="text-muted">{email}</Text>
          <Text className="text-[10px] text-muted">
            Joined on: {moment(joined_at).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleRemoveUser} className="ml-auto mr-4">
        <Ionicons name="person-remove-sharp" size={18} color={THEME[scheme].muted} />
      </TouchableOpacity>
    </View>
  );
};

export default UserinfoCard;
