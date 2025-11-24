import ScreenLayout from '@/provider/screenlayout';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const SignUp = () => {
  const router = useRouter;
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (text: string, field: string) => {};

  const handleCreateAccount = () => {};

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center gap-3">
        <Text className="text-2xl font-medium text-white">Get Started </Text>
        <Text className="text-muted">Enter Email Address</Text>
        <TextInput
          placeholder="Email/Username (e.g. johndeo@example.com)"
          value={form.email}
          onChangeText={(text) => handleInputChange(text, 'email')}
          className="rounded-md bg-input p-4"
        />
        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => handleInputChange(text, 'password')}
          className="rounded-md bg-input p-4"
        />
        <TextInput
          placeholder="Confirm Your Password"
          value={form.password}
          onChangeText={(text) => handleInputChange(text, 'confirmPassword')}
          className="rounded-md bg-input p-4"
        />
        <Button className="bg-primary" onPress={handleCreateAccount}>
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
          <TouchableOpacity onPress={() => router.push('/sigin')}>
            <Text className="text-primary">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SignUp;

// const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//
//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };
//
//   const getPasswordRequirements = (password: string) => {
//     return {
//       length: password.length >= 8,
//       lowercase: /[a-z]/.test(password),
//       uppercase: /[A-Z]/.test(password),
//       number: /\d/.test(password),
//     };
//   };
//
//   const isPasswordValid = (password: string): boolean => {
//     const requirements = getPasswordRequirements(password);
//     return (
//       requirements.length && requirements.lowercase && requirements.uppercase && requirements.number
//     );
//   };
//
//   const isFormValid = (): boolean => {
//     return validateEmail(email) && isPasswordValid(password);
//   };
//
//   async function signUpWithEmail() {
//     if (!isFormValid()) {
//       Alert.alert(
//         'Invalid Input',
//         'Please ensure your email is valid and password meets all requirements'
//       );
//       return;
//     }
//
//     setLoading(true);
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.signUp({
//       email: email.trim(),
//       password: password,
//     });
//
//     if (error) {
//       Alert.alert('Sign Up Error', error.message);
//     } else if (!session) {
//       setShowSuccess(true);
//     }
//     setLoading(false);
//   }
//
//   const getEmailInputStyle = () => {
//     return emailFocused ? styles.textInputFocused : styles.textInput;
//   };
//
//   const getPasswordInputStyle = () => {
//     return passwordFocused ? styles.textInputFocused : styles.textInput;
//   };
//
//
//
// //    const renderPasswordRequirement = (label: string, met: boolean, icon: string) => (
//     <View key={label} style={styles.requirementItem}>
//       <MaterialCommunityIcons
//         name={met ? 'check-circle' : 'circle-outline'}
//         size={14}
//         color={met ? '#4CAF50' : '#9E9E9E'}
//         style={styles.requirementIcon}
//       />
//       <Text
//         style={[styles.requirementText, met ? styles.requirementMet : styles.requirementNotMet]}>
//         {label}
//       </Text>
//     </View>
//   );
//
//   const requirements = getPasswordRequirements(password);
//
//
//
//  {/* Password Requirements */}
//           {password.length > 0 && (
//             <View style={styles.passwordRequirements}>
//               {renderPasswordRequirement('At least 8 characters', requirements.length, 'check')}
//               {renderPasswordRequirement('One lowercase letter', requirements.lowercase, 'check')}
//               {renderPasswordRequirement('One uppercase letter', requirements.uppercase, 'check')}
//               {renderPasswordRequirement('One number', requirements.number, 'check')}
//             </View>
//           )}
