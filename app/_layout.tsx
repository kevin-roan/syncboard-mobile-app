import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '@/context/authctx';
import { AppProvider } from '@/context/appctx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import '../global.css';

import { ThemeProvider } from '@/provider/themeprovider';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import { PortalHost } from '@rn-primitives/portal';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <AppProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <ThemeProvider>
              <RootLayout />
              <PortalHost />
            </ThemeProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </AppProvider>
    </AuthProvider>
  );
}

const RootLayout = () => {
  const { authenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  console.log('loading', loading, 'authecated', authenticated);

  if (loading) return null;

  LogBox.ignoreAllLogs();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={authenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="(modal)"
          options={{
            presentation: 'modal',
            headerShown: false,
            gestureEnabled: true,
            animationDuration: 300,
          }}
        />
        <Stack.Screen
          name="(screens)"
          options={{
            headerShown: false,
            gestureEnabled: true,
            animationDuration: 300,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!authenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
};
