import { useState } from "react";
import { View } from "react-native";
import MonthCalendarHorizontal from "../../ranking/month-calendar-horizontal";

const StatsMonth = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className="h-full p-5 bg-white">
      <MonthCalendarHorizontal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
};

export default StatsMonth;
