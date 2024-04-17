import { Stack } from "expo-router";

const TabLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
        name="index"
      />
    </Stack>
  );
};

export default TabLayout;
