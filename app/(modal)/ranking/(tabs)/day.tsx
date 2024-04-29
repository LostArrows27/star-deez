import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import Loading from "@/components/home/newfeed/loading";
import { useFocusEffect } from "expo-router";
import RankingDay from "@/components/home/ranking/ranking-day";

export default function DayRanking() {
  //   const id = useUserID();

  const [show, setShow] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShow(true);

      return () => {
        setShow(false);
      };
    }, [])
  );

  return <View>{show ? <RankingDay /> : <Loading />}</View>;
}
