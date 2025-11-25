import ScreenLayout from '@/provider/screenlayout';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { THEME } from '@/lib/theme';
import { FALLBACK_THEME } from '@/constants/fallback';
import { supabase } from '@/lib/supabase';
import InputError from '@/components/inputerror';
import { validateEmail } from '@/utils/validateEmail';
import Feather from '@expo/vector-icons/Feather';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();
  const scheme = useColorScheme() ?? FALLBACK_THEME;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);

      // there is an auth listener at the root
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password,
      });
      if (error) {
        throw new Error(error.message);
      }
      if (signUpData) {
        console.log(signUpData);
        router.push('/(auth)/signin');
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      Alert.alert('Failed to create account', error.message);
    } finally {
      setLoading(false);
    }
  };

  const hasFormErrors = Object.keys(errors).length > 0;

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center gap-3">
        <Text className="text-2xl font-medium text-white">Get Started </Text>
        <Text className="text-muted">Enter Email Address</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            validate: (value) => (validateEmail(value) ? true : 'Invalid email address'),
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              placeholder="Email/Username (e.g. johndeo@example.com)"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              className="rounded-md bg-input p-4 text-white"
              autoCapitalize="none"
            />
          )}
        />
        <InputError error={errors.email?.message} />
        <View className="relative">
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                placeholder="Password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                className="rounded-md bg-input p-4 text-white"
                autoCapitalize="none"
                secureTextEntry={!passwordVisible}
              />
            )}
          />
          <Feather
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={20}
            color={THEME[scheme].foreground}
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={{ position: 'absolute', right: 14, top: 14 }}
          />
        </View>

        <InputError error={errors.password?.message} />

        <View className="relative">
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              validate: (value) => value === watch('password') || 'Passwords do not match',
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                placeholder="Confirm your Password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                className="rounded-md bg-input p-4 text-white"
                autoCapitalize="none"
                secureTextEntry={!confirmPasswordVisible}
              />
            )}
          />
          <Feather
            name={confirmPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color={THEME[scheme].foreground}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={{ position: 'absolute', right: 14, top: 14 }}
          />
        </View>
        <InputError error={errors.confirmPassword?.message} />

        <Button
          className="bg-primary"
          onPress={handleSubmit(onSubmit)}
          disabled={loading || hasFormErrors}>
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
          <Text className="text-white">Already have an account ?</Text>
          <TouchableOpacity onPress={() => router.replace('/signin')}>
            <Text className="text-primary">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SignUp;
