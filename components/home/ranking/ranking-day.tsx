import { View, Text } from "react-native";
import React, { useState } from "react";
import DateCalendarHorizontal from "./date-calendar-horizontal";

export default function RankingDay() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <View className="h-full bg-white p-5">
      <DateCalendarHorizontal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Text>RankingDay</Text>
    </View>
  );
}
