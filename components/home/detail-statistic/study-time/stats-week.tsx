import { View } from "react-native";
import WeekCalendarHorizontals from "../../ranking/week-calendar-horizontal";
import { useState } from "react";

const StatsWeek = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className="h-full p-5 bg-white">
      <WeekCalendarHorizontals
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
};

export default StatsWeek;
