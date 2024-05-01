import { View } from "react-native";
import WeekCalendarHorizontals from "../../ranking/week-calendar-horizontal";
import { useState } from "react";
import WeekChart from "./week-chart";

const StatsWeek = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className="h-full gap-10 p-5 px-2 bg-white">
      <View className="w-full px-2">
        <WeekCalendarHorizontals
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          rangeMode={true}
        />
      </View>
      <WeekChart selectedDate={selectedDate} />
    </View>
  );
};

export default StatsWeek;
