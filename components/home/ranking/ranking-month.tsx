import { View, Text } from "react-native";
import React, { useState } from "react";
import MonthCalendarHorizontal from "./month-calendar-horizontal";

export default function RankingMonth() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <View className="h-full bg-white p-5">
      <MonthCalendarHorizontal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Text>Rankingweek</Text>
    </View>
  );
}
