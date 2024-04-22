import { Stack } from "expo-router";

const TabHomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
        name="(tabs)"
      />
    </Stack>
  );
};

export default TabHomeLayout;
