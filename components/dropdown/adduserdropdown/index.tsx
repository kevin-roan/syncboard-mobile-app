import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { User } from '@/types/user';
import Ionicons from '@expo/vector-icons/Ionicons';
import { THEME } from '@/lib/theme';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  users: User[];
  onInviteUser: () => void;
  onCloseDropdown: () => void;
}

const UserList = [
  {
    name: 'Kevin Mihyaoan',
    avatar_url:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Sara Johnson',
    avatar_url:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Alex Kim',
    avatar_url:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
  },
];

const AddUserDropdown: React.FC<Props> = ({ users, onInviteUser, onCloseDropdown }) => {
  const scheme = useColorScheme();

  const renderItem = ({ item, index }) => (
    <View className="flex-row items-center gap-2 p-1">
      <Avatar alt={`${item.name}'s Avatar`} className="h-4 w-4">
        <AvatarImage source={{ uri: item.avatar_url }} />
        <AvatarFallback>
          <Text className="text-sm">{item.name.slice(0, 2)}</Text>
        </AvatarFallback>
      </Avatar>
      <Text className=" text-muted">{item.name}</Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity className="absolute right-0 top-0 m-1 self-end rounded-md bg-border p-1">
        <Ionicons name="close-outline" size={18} color={THEME[scheme].muted} className="m-auto" />
      </TouchableOpacity>
      <FlatList
        data={UserList}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 2,
          paddingTop: 4,
        }}
      />
      <TouchableOpacity
        className="flex-row items-center justify-between rounded-bl-xl rounded-br-xl
        bg-input
        p-2
        ">
        <Text className="font-sm font-light text-muted">Invite User</Text>
        <Ionicons name="add-outline" size={20} color={THEME[scheme].muted} className="ml-auto" />
      </TouchableOpacity>
    </>
  );
};

export default AddUserDropdown;
