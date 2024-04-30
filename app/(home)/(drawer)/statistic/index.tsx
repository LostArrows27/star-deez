import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import CalendarStats from "@/components/home/statistic/calendar-stats/calendar-stats";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Loading from "@/components/home/newfeed/loading";

const Page = () => {
  const [show, setShow] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setShow(true);

      return () => {
        setShow(false);
      };
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="w-full">
      <Stack.Screen />
      {show ? (
        <>
          <CalendarStats />
        </>
      ) : (
        <View className="mt-20">
          <Loading />
        </View>
      )}
    </ScrollView>
  );
};

export default Page;
