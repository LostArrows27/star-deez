import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import Loading from "@/components/home/newfeed/loading";
import { useFocusEffect } from "expo-router";
import DocumentWeekStats from "@/components/home/detail-statistic/document-stats/document-week-stats";

export default function WeekRanking() {
  const [show, setShow] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShow(true);

      return () => {
        setShow(false);
      };
    }, [])
  );

  return (
    <View className="bg-white">
      {show ? <DocumentWeekStats /> : <Loading />}
    </View>
  );
}
