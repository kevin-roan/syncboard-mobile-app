import { View, TextInput, Text, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ScreenLayout from '@/provider/screenlayout';
import { THEME } from '@/lib/theme';

const SignIn = () => {
  const scheme = useColorScheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
    } catch (error) {
      console.error('Failed To Login', error);
      Alert.alert('Failed to Login', error?.message);
    }
  };

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center gap-3">
        <Text className="text-2xl font-medium text-white">Welcome to Sante Barely</Text>
        <Text className="text-muted">Email/Username</Text>
        <TextInput
          placeholder="Email/Username (e.g. johndeo@example.com)"
          value={email}
          onChangeText={(text) => setEmail(text)}
          className="rounded-md bg-input p-4"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          className="rounded-md bg-input p-4"
        />
        <Button className="bg-primary" onPress={handleLogin}>
          <Text className="text-white">Continue</Text>
        </Button>
        <Button>
          <Text>Continue with Google</Text>
        </Button>
        <View className="flex-row">
          <View className="border-b-1 flex-1 border-white" />
          <Text className="text-muted">OR</Text>
          <View className="border-b-1 flex-1 border-white" />
        </View>
        <Button variant={'outline'} className="border-1 rounded-md border-white">
          <Text className="text-white">Continue with SSO</Text>
        </Button>
        <View className="flex-row gap-2">
          <Text className="text-white">Do not have an account ?</Text>
          <TouchableOpacity>
            <Text className="text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SignIn;
