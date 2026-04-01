import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "../constants/colors";
import "../global.css";
import { supabase } from "../lib/supabase";

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const inAuthGroup = (segments[0] as string) === "auth";
      if (!session && !inAuthGroup) {
        router.replace("/auth/login" as any);
      } else if (session && inAuthGroup) {
        router.replace("/(tabs)");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const inAuthGroup = (segments[0] as string) === "auth";
      if (!session && !inAuthGroup) {
        router.replace("/auth/login" as any);
      } else if (session && inAuthGroup) {
        router.replace("/(tabs)");
      }
    });

    return () => subscription.unsubscribe();
  }, [segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.surface }}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthGate>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
        </Stack>
      </AuthGate>
    </>
  );
}