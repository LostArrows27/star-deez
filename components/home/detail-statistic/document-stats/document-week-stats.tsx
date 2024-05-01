import { View } from "react-native";
import { useState } from "react";
import MonthCalendarHorizontal from "../../ranking/month-calendar-horizontal";
import WeekCalendarHorizontals from "../../ranking/week-calendar-horizontal";
import PieChartDocument from "./pie-chart-document";
import { startOfWeek, subWeeks } from "date-fns";

const DocumentWeekStats = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className="h-full gap-10 p-5 px-0 bg-white">
      <View className="w-full px-3">
        <WeekCalendarHorizontals
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          rangeMode={true}
        />
        <PieChartDocument
          end={startOfWeek(selectedDate, {
            weekStartsOn: 1,
          })}
          start={subWeeks(
            startOfWeek(selectedDate, {
              weekStartsOn: 1,
            }),
            5
          )}
        />
      </View>
    </View>
  );
};

export default DocumentWeekStats;
