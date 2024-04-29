import StyledText from "@/components/styled-text";
import useUserID from "@/hooks/auth/useUserID";
import { RecordProps, useDateStats } from "@/hooks/home/statistic/useDateStats";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import formatTime from "@/utils/format-time";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, H4, H5, Spinner } from "tamagui";
import DateRecord from "./date-record";
import { primaryColor } from "@/constants/Colors";
import getDateStartEnd from "@/utils/get-day-start-end";
import { Plus } from "@tamagui/lucide-icons";
import { router } from "expo-router";

const renderItem = ({ item }: { item: RecordProps }) => {
  return (
    <DateRecord
      id={item.id}
      created_at={item.created_at}
      time={item.time}
      duration={item.duration}
      document={item.document?.title || ""}
    />
  );
};

const DateStats = () => {
  const [loading, setLoading] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const { date, recordData, setRecordData } = useDateStats((state) => ({
    date: state.date,
    recordData: state.recordData,
    setRecordData: state.setRecordData,
  }));

  const id = useUserID();

  const getDateRecordData = useCallback(async (id: string, date: string) => {
    setLoading(true);

    const { start, end } = getDateStartEnd(date);

    const { data, error } = await supabase
      .from("study_records")
      .select("id, created_at, time, duration, document(title)")
      .eq("user_id", id)
      .gte("time", start.toISOString())
      .lte("time", end.toISOString())
      .order("time", { ascending: true });

    if (!error) {
      setRecordData(data);
      setTotalTime(data.reduce((acc, cur) => acc + (cur.duration || 0), 0));
    }

    setLoading(false);
  }, []);

  useGetInitData(async ({ id }) => {
    await getDateRecordData(id, date);
  });

  useEffect(() => {
    if (!id || loading) return;
    const fetchData = async () => {
      await getDateRecordData(id, date);
    };

    fetchData();
  }, [date]);

  return (
    <View className="flex-1 gap-2 px-4">
      <H5 fontWeight={"$10"} textTransform="none">
        {format(date, "MMMM dd")}
      </H5>
      <StyledText textTransform="uppercase">
        TOTAL TIME : {formatTime(totalTime)}
      </StyledText>
      {loading ? (
        <View className="center w-full py-2">
          <Spinner color={primaryColor} size="large" />
        </View>
      ) : (
        <>
          <FlatList
            className="mt-3"
            initialNumToRender={2}
            scrollEnabled={false}
            contentContainerStyle={{
              gap: 20,
            }}
            horizontal={false}
            data={recordData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <Button
            mt={10}
            borderColor={"$color5"}
            borderWidth={"$1"}
            onPress={() => {
              router.push({
                pathname: `/tracking/create-study-record`,
                params: {
                  learning_date: date,
                },
              });
            }}
            icon={<Plus size={"$1.5"} />}
            w="100%"
          >
            Add record to this day
          </Button>
        </>
      )}
    </View>
  );
};

export default DateStats;
