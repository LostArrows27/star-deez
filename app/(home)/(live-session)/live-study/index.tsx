import { View } from "react-native";
import { Stack } from "expo-router";
import LiveClock from "@/components/home/live-study/live-clock";
import ClockController from "@/components/home/live-study/clock-controller";
import { useClockTimer } from "@/hooks/home/live-study/useManageStudyClock";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const LiveStudyPage = () => {
  const { stop } = useClockTimer();

  useFocusEffect(
    useCallback(() => {
      return () => {
        stop();
      };
    }, [])
  );

  return (
    <View className="">
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Live Study Session",
        }}
      />
      <View className="justify-between h-full bg-white">
        <LiveClock />
        <ClockController />
      </View>
    </View>
  );
};

export default LiveStudyPage;
