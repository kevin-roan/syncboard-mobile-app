import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import TopNavigation from '@/components/topnavigation';
import ScreenLayout from '@/provider/screenlayout';
import UserinfoCard from '@/components/cards/userinfocard';
import { useGetWorkspaceMemberList } from '@/hooks/workspace/use-workspace';
import moment from 'moment';

import { useAuth } from '@/context/authctx';
import { ActivityIndicator } from 'react-native-paper';

const WorkspaceInfo = () => {
  const { session } = useAuth();
  const { id: workspaceId } = useLocalSearchParams();

  const { data: workspaceUserList, error, isLoading } = useGetWorkspaceMemberList(workspaceId);

  if (error) {
    console.error('error ', error);
  }

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  const authUserId = session?.user?.id;

  const renderItem = ({ item }) => {
    return (
      <UserinfoCard
        user_id={item.user_id}
        role={item?.role}
        email={item?.email}
        key={item?.id}
        username={authUserId === item.user_id ? 'You' : item.username}
        joined_at={moment(item.joined_at).format('DD MMM YYYY')}
        avatar_url={item.avatar_url}
      />
    );
  };

  return (
    <ScreenLayout>
      <TopNavigation title="Worksace Name" />
      <Text className="my-4 text-lg font-light text-muted">Workspace Members</Text>
      <FlatList
        data={workspaceUserList}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 8 }}
      />
    </ScreenLayout>
  );
};

export default WorkspaceInfo;
