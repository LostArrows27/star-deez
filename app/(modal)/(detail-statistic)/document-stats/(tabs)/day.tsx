import { View } from "react-native";
import React, { useCallback, useState } from "react";
import Loading from "@/components/home/newfeed/loading";
import { useFocusEffect } from "expo-router";
import DocumentDayStats from "@/components/home/detail-statistic/document-stats/document-day-stats";

export default function DayRanking() {
  const [show, setShow] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShow(true);

      return () => {
        setShow(false);
      };
    }, [])
  );

  return <View>{show ? <DocumentDayStats /> : <Loading />}</View>;
}
