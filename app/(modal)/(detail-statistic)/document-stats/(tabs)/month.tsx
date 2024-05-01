import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import Loading from "@/components/home/newfeed/loading";
import { useFocusEffect } from "expo-router";
import DocumentMonthStats from "@/components/home/detail-statistic/document-stats/document-month-stats";

export default function MonthRanking() {
  const [show, setShow] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShow(true);

      return () => {
        setShow(false);
      };
    }, [])
  );

  return <View>{show ? <DocumentMonthStats /> : <Loading />}</View>;
}
