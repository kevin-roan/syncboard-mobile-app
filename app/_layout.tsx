import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "@/context/authctx";
import ScreenLayout from "@/provider/screenlayout";
import { AppProvider } from "@/context/appctx";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function Root() {
  return (
    <AuthProvider>
      <AppProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <RootLayout />
          </PaperProvider>
        </SafeAreaProvider>
      </AppProvider>
    </AuthProvider>
  );
}

const RootLayout = () => {
  const { authenticated, loading } = useAuth();

  console.log("authenticated", authenticated);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={authenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="(modal)"
          options={{
            presentation: "modal",
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
