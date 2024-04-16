import { useAuth } from "@/hooks/auth/useAuth";
import { Redirect, router, Stack, usePathname } from "expo-router";
import { Text } from "tamagui";

export default function AuthLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-up"
        options={{
          headerStyle: {
            backgroundColor: "rgb(0,123,255)",
          },
        }}
      />
    </Stack>
  );
}
