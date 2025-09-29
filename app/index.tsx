import { Redirect } from "expo-router";
import { useAuth } from "@/context/authctx";

export default function Index() {
  const { authenticated, loading } = useAuth();

  if (loading) return null;

  return authenticated ? <Redirect href="/(tabs)/dashboard" /> : <Redirect href="/(auth)/signin" />;
}


