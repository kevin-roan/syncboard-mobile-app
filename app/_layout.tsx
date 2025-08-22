import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "@/context/authctx";
import ScreenLayout from "@/provider/screenlayout";
import { AppProvider } from "@/context/appctx";

export default function Root() {
  return (
    <AuthProvider>
      <AppProvider>
        <ScreenLayout>
          <RootLayout />
        </ScreenLayout>
      </AppProvider>
    </AuthProvider>
  );
}

const RootLayout = () => {
  const router = useRouter();

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
