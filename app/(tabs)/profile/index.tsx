import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView, FlatList } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/authctx';
import { getProfile } from '@/services/profile';
import ScreenLayout from '@/provider/screenlayout';
import ProfilePictureCard from '@/components/cards/profile/profile-picture-card';
import { Text } from '@/components/ui/text';
import ProfileInfoCard from '@/components/cards/profile/profie-info-card';
import moment from 'moment';
import WorkspaceCard from '@/components/cards/workspace/workspace-card';
import { useGetUserWorkspaces } from '@/hooks/workspace/use-workspace';

const note =
  'Username will be appeared in syncboard issues, set it however you want be called in Syncboard';

const Profile = () => {
  const [user, setUser] = useState<unknown>(null);
  const { session } = useAuth();

  const userId = session?.user?.id;
  const usernameInital = session?.user?.email?.charAt(0).toUpperCase() || 'U';

  const { data: userWorkspaces, error: userWorkspacesError } = useGetUserWorkspaces(userId);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const data = await getProfile(userId);
        if (data?.length > 0) {
          setUser(data[0]);
        }
      } catch (error) {
        console.log('error fetching user profile', error);
        Alert.alert('Error fetching user profile');
      }
    };
    fetchProfile();
  }, [userId]);

  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      console.log('Logged out successfully');
    }
  }
  return (
    <ScreenLayout>
      <ScrollView
        className="gap-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        <View className="gap-4">
          <ProfilePictureCard usernameIntial={usernameInital} avatarUrl={user?.avatar_url} />
          <ProfileInfoCard
            fullName={user?.full_name ?? '-'}
            email={session?.user?.email ?? '-'}
            userName={user?.username ?? '-'}
            memberSince={moment(user?.created_at || new Date()).format('LL')}
            note={note}
            onLogoutCallback={handleLogOut}
          />
          <Text variant="lead">Workspaces</Text>
          <FlatList
            data={userWorkspaces}
            ListEmptyComponent={<Text>No Workspaces Yet</Text>}
            contentContainerStyle={{ gap: 4 }}
            renderItem={({ item }) => (
              <WorkspaceCard
                workspaceName={item.name}
                totalProjectsCount={43}
                archivedProjectsCount={20}
                completedProjectsCount={20}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default Profile;
