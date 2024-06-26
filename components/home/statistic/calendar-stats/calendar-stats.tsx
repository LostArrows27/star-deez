import { primaryColor } from "@/constants/Colors";
import useUserID from "@/hooks/auth/useUserID";
import { useCalendarStats } from "@/hooks/home/statistic/calendar-stats/useCalendarStats";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import { useCallback } from "react";
import { Calendar } from "react-native-calendars";
import { H4, Separator } from "tamagui";
import { useState } from "react";
import { convertDurationToColor } from "@/utils/convertDurationToColor";
import { View } from "react-native";
import { useDateStats } from "@/hooks/home/statistic/calendar-stats/useDateStats";
import DateStats from "./date-stats";
import { format } from "date-fns";
import StatsNumberList from "./stats-number-list";

const CalendarStats = () => {
  const { data, setData, setRecords, load, setLoad } = useCalendarStats();
  const setDate = useDateStats((state) => state.setDate);
  const [loading, setLoading] = useState(true);

  const id = useUserID();

  const loadData = useCallback(async (userID: string) => {
    setLoading(true);
    setLoad(true);
    const { data, error } = await supabase
      .from("study_records")
      .select("id, created_at, time, duration, document(title)")
      .eq("user_id", userID);

    if (!error) {
      setRecords(data);

      const markedDates = data.reduce<any>((acc, cur) => {
        let duration = 0;
        if (
          acc[format(cur.time ? cur.time : cur.created_at, "yyyy-MM-dd")]
            ?.duration
        ) {
          duration =
            acc[format(cur.time ? cur.time : cur.created_at, "yyyy-MM-dd")]
              ?.duration;
        }
        acc[format(cur.time ? cur.time : cur.created_at, "yyyy-MM-dd")] = {
          selected: true,
          dotColor: convertDurationToColor(cur.duration + duration),
          selectedColor: convertDurationToColor(cur.duration + duration),
          duration: cur.duration + duration,
        };

        return acc;
      }, {});

      setData(markedDates);
    }
    setLoading(false);
    setLoad(false);
  }, []);

  useGetInitData(async (user) => {
    await loadData(user.id);
  });

  return (
    <View>
      <H4 p={"$3"} pt={0}>
        Calendar Stats
      </H4>
      <StatsNumberList data={data} />
      <Calendar
        style={{
          height: 350,
        }}
        displayLoadingIndicator={loading}
        current={new Date().toISOString()}
        onDayPress={(day) => {
          setDate(day.dateString);
        }}
        theme={{
          arrowColor: primaryColor,
          selectedDayBackgroundColor: primaryColor,
          todayTextColor: "black",
        }}
        markedDates={{
          [format(new Date(), "yyyy-MM-dd")]: {
            marked: true,
            dotColor: "white",
            selected: true,
            today: true,
          },
          ...data,
        }}
      />
      <DateStats />
      <Separator mt="$6" />
    </View>
  );
};

export default CalendarStats;
