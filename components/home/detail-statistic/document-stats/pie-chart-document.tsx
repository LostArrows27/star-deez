import { View } from "react-native";
import { H3, H4, Separator, Spinner } from "tamagui";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { DocumentStatsProps } from "@/types/home/stats-type";
import { startOfWeek, parseISO, isWithinInterval, format } from "date-fns";
import randomColor from "randomcolor";
import StyledPressable from "@/components/styled-pressable";
import { router } from "expo-router";
import { RecordProps } from "@/hooks/home/statistic/calendar-stats/useDateStats";
import { supabase } from "@/lib/supabase";
import useUserID from "@/hooks/auth/useUserID";
import StyledText from "@/components/styled-text";
import { Image } from "expo-image";

const screenWidth = Dimensions.get("screen").width;

const PieChartDocument = ({ start, end }: { start: Date; end: Date }) => {
  const [records, setRecords] = useState<RecordProps[]>([]);
  const [load, setLoad] = useState(true);

  const [data, setData] = useState<DocumentStatsProps[]>([]);

  const id = useUserID();

  useEffect(() => {
    const getRecords = async (start: Date, end: Date) => {
      setLoad(true);
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("study_records")
        .select("id, created_at, time, duration, document(title)")
        .eq("user_id", id!)
        .gte("time", startDate.toISOString())
        .lte("time", endDate.toISOString());

      if (!error) {
        setRecords(data);
      }

      setLoad(false);
    };

    if (start && end) {
      getRecords(start, end);
    }
  }, [start, end]);

  useEffect(() => {
    if (records.length > 0) {
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const start = startOfWeek(end);
      start.setHours(0, 0, 0, 0);

      const groupedData = records.reduce<any>((acc, record, index) => {
        const title = record.document?.title || "Unknown";
        if (!acc[title]) {
          acc[title] = {
            name: title,
            duration: 0,
            color: randomColor({
              luminosity: index % 2 === 0 ? "light" : "dark",
            }),
            legendFontColor: "#7F7F7F",
            legendFontSize: 12,
          };
        }
        acc[title].duration += record.duration;
        return acc;
      }, {});

      const chartData = Object.values(groupedData);

      chartData.forEach((data: any) => {
        if (data.name.length > 15) {
          data.name = data.name.slice(0, 9) + "...";
        }
      });
      setData(chartData as any);
    } else {
      setData([]);
    }
  }, [records, start, end]);

  return (
    <View className="w-full">
      <H4 p={"$3"}>Document Stats</H4>
      {load ? (
        <View className="items-center w-full mt-4 bg-white">
          <View className=" items-center justify-center">
            <Spinner scale={1} size="large" color="$green10" />
          </View>
        </View>
      ) : (
        <View className="px-1 pt-3">
          <StyledPressable
            onPress={() => {
              router.push("/document-stats/day");
            }}
            className="border-emerald-500 rounded-2xl py-2 border"
          >
            {records.length > 0 ? (
              <View className=" w-full px-3">
                <PieChart
                  hasLegend={true}
                  data={data}
                  width={screenWidth - 50}
                  height={180}
                  chartConfig={{
                    propsForVerticalLabels: {
                      fontSize: 2,
                    },
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      gap: 0,
                      backgroundColor: "red",
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726",
                    },
                  }}
                  accessor={"duration"}
                  backgroundColor={"transparent"}
                  paddingLeft={"0"}
                />
              </View>
            ) : (
              <View className="center w-full gap-4 p-3">
                <Image
                  autoplay
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  contentFit="cover"
                  source={require("@/assets/images/stats/pusheen_eat.gif")}
                />
                <H3
                  color={"$color8"}
                  mt="8"
                  textAlign="center"
                  textTransform="uppercase"
                >
                  No document recorded
                </H3>
                <StyledText
                  color={"$gray10Light"}
                  lineHeight={"$5"}
                  mx="$7"
                  textAlign="center"
                >
                  Look like you haven't recorded any document yet this time
                </StyledText>
              </View>
            )}
          </StyledPressable>
        </View>
      )}
      <Separator mt="$6" mb="$4" />
    </View>
  );
};

export default PieChartDocument;
