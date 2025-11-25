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
import { cn } from '@/lib/utils';
import { validateEmail } from '@/utils/validateEmail';
import InputError from '@/components/inputerror';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const scheme = useColorScheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });

  const [showPassword, setShowpassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      // there is a auth listener at the root.
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      Alert.alert('Error Logging in', err.message);
    }
  };

  const hasFormErrors = Object.keys(errors).length > 0;

  return (
    <ScreenLayout>
      <KeyboardAvoidingView className="flex-1 justify-center gap-3">
        <Text className="text-2xl font-medium text-white">Welcome Back!</Text>
        <Text className="text-muted">Enter Your Email Address</Text>
        <View>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              validate: (value) => (validateEmail(value) ? true : 'Invalid email address'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email Address (e.g. johndeo@example.com)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                className={cn(
                  'rounded-md bg-input p-4 text-white',
                  errors.email && 'border-distructive'
                )}
                autoCapitalize="none"
              />
            )}
          />

          <InputError error={errors.email?.message} />
        </View>
        <View className="relative">
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                className={cn(
                  'rounded-md bg-input p-4 text-white',
                  errors.password && 'border-distructive'
                )}
                secureTextEntry={!showPassword}
              />
            )}
          />

          <InputError error={errors.password?.message} />
          <Feather
            name={showPassword ? 'eye-off' : 'eye'}
            style={{ position: 'absolute', right: 10, top: 14 }}
            size={20}
            color={THEME[scheme!].muted}
            onPress={() => setShowpassword(!showPassword)}
          />
        </View>
        <Button
          className={cn('bg-primary', hasFormErrors && 'bg-destructive')}
          onPress={handleSubmit(onSubmit)}
          disabled={loading || hasFormErrors}>
          {loading && <ActivityIndicator size="small" color={THEME[scheme!].foreground} />}
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
          <TouchableOpacity onPress={() => router.replace('/signup')}>
            <Text className="text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default SignIn;
