import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import styles from './styles';
import { validateEmail } from '@/utils/validateEmail';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = (): boolean => {
    return validateEmail(email) && password.length >= 6;
  };

  async function signInWithEmail() {
    if (!isFormValid()) {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid email and password (minimum 6 characters)'
      );
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      Alert.alert('Sign In Error', error.message);
    }
    setLoading(false);
  }

  const getEmailInputStyle = () => {
    return emailFocused ? styles.textInputFocused : styles.textInput;
  };

  const getPasswordInputStyle = () => {
    return passwordFocused ? styles.textInputFocused : styles.textInput;
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <MaterialCommunityIcons name="clipboard-check" size={64} style={styles.logoIcon} />
        <Text style={styles.appTitle}>Planor.app</Text>
        <Text style={styles.appSubtitle}>Manage your projects efficiently</Text>
      </View>

      {/* Form Card */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Welcome Back</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="email@address.com"
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            left={<TextInput.Icon icon="email-outline" />}
            style={getEmailInputStyle()}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Enter your password"
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            mode="outlined"
            left={<TextInput.Icon icon="lock-outline" />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={getPasswordInputStyle()}
          />
        </View>

        {/* Sign In Button */}
        <Button
          icon="login"
          mode="contained"
          loading={loading}
          disabled={loading || !isFormValid()}
          onPress={signInWithEmail}
          style={[styles.signInButton, (!isFormValid() || loading) && styles.signInButtonDisabled]}
          contentStyle={styles.signInButtonContent}
          labelStyle={[
            styles.signInButtonText,
            (!isFormValid() || loading) && styles.signInButtonTextDisabled,
          ]}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Sign Up Section */}
      <View style={styles.signUpSection}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <Button
          mode="outlined"
          onPress={() => router.push('/signup')}
          style={styles.signUpButton}
          contentStyle={styles.signUpButtonContent}
          labelStyle={styles.signUpButtonText}>
          Create Account
        </Button>
      </View>
    </View>
  );
}
