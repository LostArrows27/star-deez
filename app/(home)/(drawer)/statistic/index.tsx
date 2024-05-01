import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Loading from "@/components/home/newfeed/loading";
import CalendarStats from "@/components/home/statistic/calendar-stats/calendar-stats";
import StudyTimeChart from "@/components/home/statistic/study-time/study-time-chart";
import DocumentPieChartStats from "@/components/home/statistic/document-stats/document-pie-chart-stats";

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
          <StudyTimeChart show={show} />
          <DocumentPieChartStats show={show} />
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
