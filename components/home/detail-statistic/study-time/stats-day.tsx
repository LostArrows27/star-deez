import { useState } from "react";
import { View } from "react-native";
import DateCalendarHorizontal from "../../ranking/date-calendar-horizontal";
import DayChart from "./day-chart";

const StatsDay = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className="h-full gap-10 p-5 px-2 bg-white">
      <View className="w-full px-2">
        <DateCalendarHorizontal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          rangeMode={true}
        />
      </View>
      <DayChart selectedDate={selectedDate} />
    </View>
  );
};

export default StatsDay;
