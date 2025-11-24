import {
  View,
  TextInput,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
  useColorScheme,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ScreenLayout from '@/provider/screenlayout';
import { THEME } from '@/lib/theme';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

const SignIn = () => {
  const router = useRouter();
  const scheme = useColorScheme();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowpassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Error Logging in', err.message);
    }
  };

  const handleChangeInput = (value: string, field: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScreenLayout>
      <KeyboardAvoidingView className="flex-1 justify-center gap-3">
        <Text className="text-2xl font-medium text-white">Welcome Back!</Text>
        <Text className="text-muted">Enter Your Email Address</Text>
        <TextInput
          placeholder="Email/Username (e.g. johndeo@example.com)"
          value={form.email}
          onChangeText={(email) => handleChangeInput(email, 'email')}
          className="rounded-md bg-input p-4 text-white"
          autoCapitalize="none"
        />
        <View>
          <TextInput
            placeholder="Password"
            value={form.password}
            onChangeText={(password) => handleChangeInput(password, 'password')}
            className="rounded-md bg-input p-4 pr-10 text-white"
            secureTextEntry={!showPassword}
          />
          <Feather
            name={showPassword ? 'eye-off' : 'eye'}
            className="absolute right-4 top-4"
            size={20}
            color={THEME[scheme].muted}
            onPress={() => setShowpassword(!showPassword)}
          />
        </View>
        <Button className="bg-primary" onPress={handleLogin} disabled={hasError}>
          {loading && <ActivityIndicator size="small" color={THEME[scheme].foreground} />}
          <Text className="text-white">Continue</Text>
        </Button>
        <Button variant={'outline'} className="border-1">
          <Text className="text-white">Continue with Google</Text>
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
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default SignIn;
