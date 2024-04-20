import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "@/css/global.css";
import AuthProvider from "@/providers/auth-provider";
import { TamaguiProvider, Theme } from "tamagui";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import appConfig from "@/tamagui.config";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import ModalProviders from "@/providers/modal-provider";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import CustomToast from "@/components/ui/toast-custom";

import * as SecureStore from "expo-secure-store";
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
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

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
  const [loading, setLoading] = useState(true);

  return (
    <TamaguiProvider config={appConfig}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Theme name={"green"}>
          <AuthProvider loading={loading} setLoading={setLoading}>
            <ModalProviders />
            <ToastProvider burntOptions={{ from: "bottom" }}>
              <SafeAreaView
                style={{
                  flex: 1,
                }}
                className="*:!font-[Inter] text-em"
              >
                {loading ? (
                  <View className="items-center justify-center h-screen">
                    <ActivityIndicator size={"large"} />
                  </View>
                ) : (
                  <Stack>
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(auth)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(home)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(modal)/tracking/create-document"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                )}
              </SafeAreaView>

              <CustomToast />
              <ToastViewport bottom={30} left={0} right={0} />
            </ToastProvider>
          </AuthProvider>
        </Theme>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
