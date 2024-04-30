import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import Loading from "@/components/home/newfeed/loading";
import { useFocusEffect } from "expo-router";
import StatsDay from "@/components/home/detail-statistic/study-time/stats-day";

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

  return <View>{show ? <StatsDay /> : <Loading />}</View>;
}
