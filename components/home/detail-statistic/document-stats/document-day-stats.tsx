import { View } from "react-native";
import DateCalendarHorizontal from "../../ranking/date-calendar-horizontal";
import { useState } from "react";
import PieChartDocument from "./pie-chart-document";
import { subWeeks } from "date-fns";

const DocumentDayStats = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View className="h-full gap-10 p-5 px-2 bg-white">
      <View className="w-full px-2">
        <DateCalendarHorizontal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          rangeMode={true}
        />
        <PieChartDocument
          end={selectedDate}
          start={subWeeks(selectedDate, 1)}
        />
      </View>
    </View>
  );
};

export default DocumentDayStats;
