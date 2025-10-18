import { TouchableOpacity } from 'react-native';

import { Text } from '@/components/ui/text';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/getInitials';

interface Props {
  avatarUrl: string;
  username: string;
}

const UserChip: React.FC<Props> = ({ avatarUrl, username }) => {
  const initials = getInitials(username);
  return (
    <TouchableOpacity className="flex-row items-center gap-3  rounded-full bg-input p-[1px] px-2">
      <Avatar
        alt="@mrzachnugent"
        className="
        -mr-1 h-3 w-3 border-background web:border-0 web:ring-2 web:ring-background">
        <AvatarImage
          source={{
            uri:
              avatarUrl ??
              'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F4723038%2Fpexels-photo-4723038.jpeg&f=1&nofb=1&ipt=9225c6a4b8532ffcaa158bd0b76d4c89f2fe5a2b1f728d49b61ef24e3f148577',
          }}
        />
        <AvatarFallback>
          <Text>{initials}</Text>
        </AvatarFallback>
      </Avatar>
      <Text className="text-sm">{username}</Text>
    </TouchableOpacity>
  );
};
export default UserChip;
