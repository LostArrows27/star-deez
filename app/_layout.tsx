import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/css/global.css";
import AuthProvider from "@/providers/auth-provider";
import { TamaguiProvider, Theme } from "tamagui";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import appConfig from "@/tamagui.config";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import ModalProviders from "@/providers/modal-provider";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import CustomToast from "@/components/toast-custom";
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
  return (
    <TamaguiProvider config={appConfig}>
      <Theme name={"blue"}>
        <AuthProvider>
          <ModalProviders />

          <ToastProvider burntOptions={{ from: "bottom" }}>
            <SafeAreaView
              style={{
                flex: 1,
                paddingTop:
                  Platform.OS === "android" ? StatusBar.currentHeight : 0,
              }}
              className="*:!font-[Inter] "
            >
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(home)" options={{ headerShown: false }} />
                <Stack.Screen name="cart" options={{ presentation: "modal" }} />
              </Stack>
            </SafeAreaView>

            <CustomToast />
            <ToastViewport bottom={30} left={0} right={0} />
          </ToastProvider>
        </AuthProvider>
      </Theme>
    </TamaguiProvider>
  );
}
