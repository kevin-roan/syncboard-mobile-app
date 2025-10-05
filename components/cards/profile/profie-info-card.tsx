import * as React from 'react';

import { Button } from '@/components/ui/button';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

interface Props {
  email: string;
  fullName: string;
  userName: string;
  note?: string;
  memberSince: string;
  onLogoutCallback: () => void;
}

const ProfileInfoCard: React.FC<Props> = ({
  email,
  fullName,
  userName,
  note,
  memberSince,
  onLogoutCallback,
}) => {
  return (
    <View className="rounded-3xl  bg-card  p-4">
      <Field label="Full Name" value={fullName} />
      <Field label="Email" value={email} />
      <Field label="User Name" value={userName} />
      <Field label="Member Since" value={memberSince} />
      <Text className="font-light text-muted">{note}</Text>
      <Button variant={'destructive'} className="mt-5 rounded-3xl" onPress={onLogoutCallback}>
        <Text>Log Out</Text>
      </Button>
    </View>
  );
};

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View className="py-3">
    <Text className="font-light text-muted">{label}</Text>
    <Text className="text-foreground">{value}</Text>
  </View>
);
export default ProfileInfoCard;
