import CalendarStats from "@/components/home/statistic/calendar-stats";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

const Page = () => {
  return (
    <ScrollView className="w-full">
      <Stack.Screen />
      <CalendarStats />
    </ScrollView>
  );
};

export default Page;
