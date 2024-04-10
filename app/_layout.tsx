import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme";
import "@/css/global.css";
import AuthProvider from "@/providers/auth-provider";
import { TamaguiProvider, Theme } from "tamagui";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import appConfig from "@/tamagui.config";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    unset: require("@tamagui/font-inter/otf/Inter-Medium.otf"), // default
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={appConfig}>
        <Theme name={"blue_active"}>
          <AuthProvider>
            <Stack>
              {/* <Stack.Screen name="(admin)" options={{ headerShown: false }} /> */}
              {/* <Stack.Screen name="(user)" options={{ headerShown: false }} /> */}
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen name="cart" options={{ presentation: "modal" }} />
            </Stack>
          </AuthProvider>
        </Theme>
      </TamaguiProvider>
    </ThemeProvider>
  );
}
