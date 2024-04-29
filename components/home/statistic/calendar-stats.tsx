import { Calendar } from "react-native-calendars";

const CalendarStats = () => {
  return (
    <Calendar
      style={{
        height: 350,
      }}
      current={new Date().toISOString()}
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      markedDates={{
        "2012-03-01": { selected: true, marked: true, selectedColor: "blue" },
        "2012-03-02": { marked: true },
        "2012-03-03": { selected: true, marked: true, selectedColor: "blue" },
      }}
    />
  );
};

export default CalendarStats;
