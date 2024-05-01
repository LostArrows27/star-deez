import { Image } from "expo-image";

import { View } from "react-native";
import { H3, H4, Separator, Spinner } from "tamagui";
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
  subWeeks,
} from "date-fns";
import { Text } from "react-native";
import Loading from "../../newfeed/loading";
import StudyTimeTotal from "./study-time-total";
import StyledPressable from "@/components/styled-pressable";
import { router } from "expo-router";
import StyledText from "@/components/styled-text";
import { RecordProps } from "@/hooks/home/statistic/calendar-stats/useDateStats";

type ChartData = {
  [key: string]: any;
  date: string;
  totalDuration: number;
};

const StudyTimeChart = ({
  show,
  records,
  load,
  isUser = true,
}: {
  show?: boolean;
  records: RecordProps[];
  load: boolean;
  isUser?: boolean;
}) => {
  const [data, setData] = useState<ChartData[]>([]);

  const [colors, setColors] = useState<string[]>([]);

  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    if (records) {
      const endOfCurrentWeek = new Date();
      endOfCurrentWeek.setHours(23, 59, 59, 999);
      const startOfCurrentWeek = subWeeks(endOfCurrentWeek, 1);
      startOfCurrentWeek.setHours(0, 0, 0, 0);

      const filteredRecords = records.filter((record) =>
        isWithinInterval(parseISO(record.time!), {
          start: startOfCurrentWeek,
          end: endOfCurrentWeek,
        })
      );

      const allKeys = new Set(
        filteredRecords
          .map((record) => record.document?.title)
          .filter((title): title is string => !!title)
      );

      const groupedByDate = filteredRecords.reduce(
        (acc: Record<string, ChartData>, record) => {
          const dateStr = format(parseISO(record.time!), "yyyy-MM-dd");
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

      const chartData = [];
      const uniqueKeys = Array.from(allKeys);
      const colorPalette = uniqueKeys.map((_, index) =>
        randomColor({
          luminosity: index % 2 === 0 ? "light" : "dark",
        })
      );

      for (
        let d = startOfCurrentWeek;
        d <= endOfCurrentWeek;
        d = addDays(d, 1)
      ) {
        const formattedDate = format(d, "yyyy-MM-dd");
        if (groupedByDate[formattedDate]) {
          chartData.push(groupedByDate[formattedDate]);
        } else {
          chartData.push({
            date: formattedDate,
            totalDuration: 0,
            ...Object.fromEntries(uniqueKeys.map((key) => [key, 0])),
          });
        }
      }

      setData(chartData);
      setKeys(uniqueKeys);
      setColors(colorPalette);
    }
  }, [records]);

  return (
    <View className="w-full">
      <H4 p={"$3"}>Study Time</H4>

      {load ? (
        <View className="items-center w-full bg-white">
          <View className=" items-center justify-center">
            <Spinner scale={1} size="large" color="$green10" />
          </View>
        </View>
      ) : (
        <View className="px-3">
          <StudyTimeTotal records={records} />
          <View className="border-emerald-500 rounded-2xl py-2 border">
            {records.length > 0 ? (
              <>
                <StyledPressable
                  onPress={() => {
                    if (!isUser) return;
                    router.push({
                      pathname: "/study-time/day",
                    });
                  }}
                  className="w-full px-3 h-[250px]"
                >
                  <View className="h-[250px] flex-1 w-full flex-row items-start">
                    <YAxis
                      numberOfTicks={6}
                      data={data}
                      svg={{
                        fill: "gray",
                        fontSize: 10,
                        fontFamily: "Inter",
                      }}
                      style={{
                        width: 40,
                      }}
                      yAccessor={({ item }: { item: any }) =>
                        item.totalDuration / 60
                      }
                      formatLabel={(value) => `${value}h`}
                      contentInset={{ top: 20, bottom: 20 }}
                    />
                    <StackedBarChart
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
                </StyledPressable>
                <View className="gap-4 px-[44px] mt-5">
                  {keys.map((value, index) => (
                    <View key={index} className="flex-row gap-6 py-2">
                      <View
                        className="w-[16px] h-[16px] rounded-full"
                        style={{ backgroundColor: colors[index] }}
                      ></View>
                      <Text numberOfLines={1}>{value}</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <StyledPressable
                onPress={() => {
                  if (!isUser) return;
                  router.push({
                    pathname: "/study-time/day",
                  });
                }}
                className="center w-full gap-4 p-3"
              >
                <Image
                  autoplay
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  contentFit="cover"
                  source={require("@/assets/images/stats/pusheen_round.gif")}
                />
                <H3
                  color={"$color8"}
                  mt="8"
                  textAlign="center"
                  textTransform="uppercase"
                >
                  No study record found
                </H3>
                <StyledText
                  color={"$gray10Light"}
                  lineHeight={"$5"}
                  mx="$7"
                  textAlign="center"
                >
                  {isUser
                    ? "Look like you haven't recorded any thing this week"
                    : "Look like this user hasn't recorded any thing this week"}
                </StyledText>
              </StyledPressable>
            )}
          </View>
        </View>
      )}
      <Separator mt="$6" />
    </View>
  );
};

export default StudyTimeChart;
