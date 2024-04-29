import { View, Text } from "react-native";
import React, { useState } from "react";
import WeekCalendarHorizontals from "./week-calendar-horizontal";

export default function RankingWeek() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <View className="h-full bg-white p-5">
      <WeekCalendarHorizontals
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Text>Rankingweek</Text>
    </View>
  );
}
