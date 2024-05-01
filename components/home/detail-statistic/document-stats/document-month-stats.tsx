import { View } from "react-native";
import { useState } from "react";
import MonthCalendarHorizontal from "../../ranking/month-calendar-horizontal";
import PieChartDocument from "./pie-chart-document";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

const DocumentMonthStats = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className="h-full gap-10 p-5 px-2 bg-white">
      <View className="w-full px-2">
        <MonthCalendarHorizontal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          rangeMode={true}
        />
        <PieChartDocument
          end={endOfMonth(selectedDate)}
          start={subMonths(startOfMonth(selectedDate), 5)}
        />
      </View>
    </View>
  );
};

export default DocumentMonthStats;
