import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Loading from "@/components/home/newfeed/loading";
import CalendarStats from "@/components/home/statistic/calendar-stats/calendar-stats";
import StudyTimeChart from "@/components/home/statistic/study-time/study-time-chart";
import DocumentPieChartStats from "@/components/home/statistic/document-stats/document-pie-chart-stats";
import YearGraph from "@/components/home/statistic/year-graph/year-graph";
import { useCalendarStats } from "@/hooks/home/statistic/calendar-stats/useCalendarStats";

const Page = () => {
  const [show, setShow] = useState(false);

  const { records, load } = useCalendarStats();

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
          <StudyTimeChart load={load} records={records} show={show} />
          <DocumentPieChartStats load={load} records={records} show={show} />
          <YearGraph load={load} records={records} />
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
