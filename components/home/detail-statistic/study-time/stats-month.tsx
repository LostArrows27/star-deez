import { useState } from "react";
import { View } from "react-native";
import MonthCalendarHorizontal from "../../ranking/month-calendar-horizontal";
import MonthChart from "./month-chart";

const StatsMonth = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className="h-full gap-10 p-5 px-2 bg-white">
      <View className="w-full px-2">
        <MonthCalendarHorizontal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          rangeMode={true}
        />
      </View>
      <MonthChart selectedDate={selectedDate} />
    </View>
  );
};

export default StatsMonth;
