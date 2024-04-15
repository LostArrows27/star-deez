import { Stack } from "expo-router";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { Text, View } from "tamagui";

const IntroductionPage = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "rgb(242, 242, 242)",
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <Text>hahahssssss</Text>
    </SafeAreaView>
  );
};

export default IntroductionPage;
