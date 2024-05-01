import { useCalendarStats } from "@/hooks/home/statistic/calendar-stats/useCalendarStats";
import { endOfMonth, isWithinInterval, parseISO, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import { Image } from "expo-image";
import { H3, H4, Separator, Spinner } from "tamagui";
import StyledText from "@/components/styled-text";

const screenWidth = Dimensions.get("screen").width;
// const commitsData = [
//   { date: "2017-01-02", count: 1 },
//   { date: "2017-01-03", count: 2 },
//   { date: "2017-01-04", count: 3 },
//   { date: "2017-01-05", count: 4 },
//   { date: "2017-01-06", count: 5 },
//   { date: "2017-01-30", count: 2 },
//   { date: "2017-01-31", count: 3 },
//   { date: "2017-03-01", count: 2 },
//   { date: "2017-04-02", count: 4 },
//   { date: "2017-03-05", count: 2 },
//   { date: "2017-02-30", count: 4 },
// ];

const handleToolTip: any = {};

const YearGraph = () => {
  const { records, load } = useCalendarStats();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (records) {
      const commitsData = records.map((record) => ({
        date: record.time,
        count: record.duration,
      }));

      const today = new Date();
      const endOfCurrentMonth = endOfMonth(today);
      const oneHundredThirtyDaysAgo = subDays(endOfCurrentMonth, 130);

      const filteredCommits = commitsData.filter((commit) => {
        const date = parseISO(commit.date!);
        return isWithinInterval(date, {
          start: oneHundredThirtyDaysAgo,
          end: endOfCurrentMonth,
        });
      });

      setData(filteredCommits);
    }
  }, [records]);

  return (
    <View className="w-full">
      <H4 p={"$3"}>Year Activity</H4>
      {load ? (
        <View className="items-center w-full mt-4 bg-white">
          <View className=" items-center justify-center">
            <Spinner scale={1} size="large" color="$green10" />
          </View>
        </View>
      ) : (
        <View className="px-3 pt-3">
          <View className="border-emerald-500 parents rounded-2xl flex-row py-6 overflow-hidden border">
            {records.length > 0 ? (
              <ContributionGraph
                showMonthLabels={true}
                values={data}
                squareSize={15}
                endDate={endOfMonth(new Date())}
                numDays={130}
                width={screenWidth - 48}
                tooltipDataAttrs={(value) => handleToolTip}
                height={190}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 0.5,
                  useShadowColorFromDataset: false, // optional
                }}
              />
            ) : (
              <View className="center w-full gap-4 p-3">
                <Image
                  autoplay
                  style={{
                    width: 180,
                    height: 180,
                    marginBottom: 10,
                  }}
                  contentFit="cover"
                  source={require("@/assets/images/stats/pusheen_drink.gif")}
                />
                <H3
                  color={"$color8"}
                  mt="8"
                  textAlign="center"
                  textTransform="uppercase"
                >
                  No activity found
                </H3>
                <StyledText
                  color={"$gray10Light"}
                  lineHeight={"$5"}
                  mx="$7"
                  textAlign="center"
                >
                  We can't find any activity in the past 4 months
                </StyledText>
              </View>
            )}
          </View>
        </View>
      )}
      <Separator mt="$6" mb="$4" />
    </View>
  );
};

export default YearGraph;
