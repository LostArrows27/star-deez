import { View } from "react-native";
import StatsNumberChild from "./stats-number-child";
import { useEffect, useState } from "react";
import { useGetInitData } from "@/hooks/useGetInitData";
import { MarkedDates } from "react-native-calendars/src/types";
import { CalendarDataProps } from "@/hooks/home/statistic/useCalendarStats";

type StatsNumberListProps = {
  [key: string]: number;
};

const getStartOfTheWeek = (date: Date) => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return start;
};

const getEndOfTheWeek = (date: Date) => {
  const end = getStartOfTheWeek(date);
  end.setDate(end.getDate() + 6);
  return end;
};

const getStartOfTheMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getEndOfTheMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const StatsNumberList = ({ data }: { data: CalendarDataProps }) => {
  const [stats, setStats] = useState<StatsNumberListProps>({
    "This week": 0,
    "Last week": 0,
    "This month": 0,
    "Last month": 0,
  });

  useEffect(() => {
    const now = new Date();
    const lastWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);

    const ranges = {
      thisWeek: [getStartOfTheWeek(now), getEndOfTheWeek(now)],
      lastWeek: [getStartOfTheWeek(lastWeek), getEndOfTheWeek(lastWeek)],
      thisMonth: [getStartOfTheMonth(now), getEndOfTheMonth(now)],
      lastMonth: [getStartOfTheMonth(lastMonth), getEndOfTheMonth(lastMonth)],
    };

    const newStats = {
      "This week": 0,
      "Last week": 0,
      "This month": 0,
      "Last month": 0,
    };

    Object.keys(data).forEach((date) => {
      const dateObj = new Date(date);
      const duration = data[date].duration;

      if (dateObj >= ranges.thisWeek[0] && dateObj <= ranges.thisWeek[1]) {
        newStats["This week"] += duration;
      }
      if (dateObj >= ranges.lastWeek[0] && dateObj <= ranges.lastWeek[1]) {
        newStats["Last week"] += duration;
      }
      if (dateObj >= ranges.thisMonth[0] && dateObj <= ranges.thisMonth[1]) {
        newStats["This month"] += duration;
      }
      if (dateObj >= ranges.lastMonth[0] && dateObj <= ranges.lastMonth[1]) {
        newStats["Last month"] += duration;
      }
    });

    setStats(newStats);
  }, [data]);

  return (
    <View className="flex-row gap-2 px-3 my-2">
      {Object.keys(stats).map((key) => (
        <StatsNumberChild key={key} title={key} duration={stats[key]} />
      ))}
    </View>
  );
};

export default StatsNumberList;
