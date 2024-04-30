import { View } from "react-native";
import { H4, Separator } from "tamagui";
import { StackedBarChart, XAxis, YAxis, Grid } from "react-native-svg-charts";
import { useCalendarStats } from "@/hooks/home/statistic/calendar-stats/useCalendarStats";
import { useEffect, useState } from "react";
import randomColor from "randomcolor";
import {
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO,
  format,
  addDays,
} from "date-fns";
import { Text } from "react-native";

type ChartData = {
  [key: string]: any;
  date: string;
  totalDuration: number;
};

const StudyTime = () => {
  const { records } = useCalendarStats();

  const [data, setData] = useState<ChartData[]>([]);

  const [colors, setColors] = useState<string[]>([]);

  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    if (
      records &&
      records.length > 0 &&
      data.length === 0 &&
      keys.length === 0 &&
      colors.length === 0
    ) {
      const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
      const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

      const allKeys = new Set(
        records
          .map((record) => record.document?.title)
          .filter((title): title is string => !!title)
      );

      const filteredRecords = records.filter((record) =>
        isWithinInterval(parseISO(record.created_at), {
          start: startOfCurrentWeek,
          end: endOfCurrentWeek,
        })
      );

      const groupedByDate = filteredRecords.reduce(
        (acc: Record<string, ChartData>, record) => {
          const dateStr = format(parseISO(record.created_at), "yyyy-MM-dd");
          if (!acc[dateStr]) {
            acc[dateStr] = { date: dateStr, totalDuration: 0 };
            allKeys.forEach((key) => {
              acc[dateStr][key] = 0;
            });
          }
          acc[dateStr].totalDuration += record.duration;
          const key = record.document?.title;
          if (key) {
            acc[dateStr][key] += record.duration;
          }
          return acc;
        },
        {}
      );

      for (
        let d = startOfCurrentWeek;
        d <= endOfCurrentWeek;
        d = addDays(d, 1)
      ) {
        const formattedDate = format(d, "yyyy-MM-dd");
        if (!groupedByDate[formattedDate]) {
          groupedByDate[formattedDate] = {
            date: formattedDate,
            totalDuration: 0,
          };
          allKeys.forEach((key) => {
            groupedByDate[formattedDate][key] = 0;
          });
        }
      }

      const chartData = Object.values(groupedByDate);
      const uniqueKeys = Array.from(allKeys);
      const colorPalette = uniqueKeys.map((_, index) =>
        randomColor({
          luminosity: index % 2 === 0 ? "light" : "dark",
        })
      );

      setData(chartData);
      setKeys(uniqueKeys);
      setColors(colorPalette);
    }
  }, [records]);

  return (
    <View className="w-full">
      <H4 p={"$3"}>Study Time</H4>

      <View className="w-full px-3 h-[250px]">
        <View className="h-[250px] flex-1 w-full flex-row items-start">
          <YAxis
            data={data}
            svg={{
              fill: "gray",
              fontSize: 10,
              fontFamily: "Inter",
            }}
            style={{
              width: 40,
            }}
            yAccessor={({ item }: { item: any }) => item.totalDuration / 60}
            formatLabel={(value) => `${value}h`}
            contentInset={{ top: 20, bottom: 20 }}
          />
          <StackedBarChart
            animate={true}
            animationDuration={500}
            spacingInner={0.3}
            spacingOuter={0.3}
            style={{ flex: 1 }}
            keys={keys}
            colors={colors}
            data={data}
            showGrid={true}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </StackedBarChart>
        </View>
        <View className=" flex-row w-full pl-[40px]">
          <XAxis
            style={{ marginHorizontal: 0, flex: 1 }}
            data={data}
            formatLabel={(value, index) => {
              return format(parseISO(data[index].date), "dd/MM");
            }}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: "black", fontFamily: "Inter" }}
          />
        </View>
      </View>
      <View className="gap-4 px-[44px] mt-4">
        {keys.map((value, index) => (
          <View key={index} className="flex-row gap-6 py-2">
            <View
              className="w-[18px] h-[18px] rounded-full"
              style={{ backgroundColor: colors[index] }}
            ></View>
            <Text>{value}</Text>
          </View>
        ))}
      </View>
      <Separator mt="$4" />
    </View>
  );
};

export default StudyTime;
