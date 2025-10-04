import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';

import { useAuth } from '@/context/authctx';
import { getProfile } from '@/services/profile';
import ScreenLayout from '@/provider/screenlayout';
import ProfilePictureCard from '@/components/ui/cards/profile/profile-picture-card';
import ProfileInfoCard from '@/components/ui/cards/profile/profie-info-card';
import moment from 'moment';

const note =
  ' Username will be appeared in syncboard issues, set it however you want be called in Syncboard ';

const Profile = () => {
  const [user, setUser] = useState<unknown>(null);
  const { session } = useAuth();

  const userId = session?.user?.id;
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

  const usernameInital = session?.user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <ScreenLayout>
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
      </View>
    </ScreenLayout>
  );
};

export default Profile;
