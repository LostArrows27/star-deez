import { useAuth } from "@/hooks/auth/useAuth";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }

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
