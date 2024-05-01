import { useCalendarStats } from "@/hooks/home/statistic/calendar-stats/useCalendarStats";
import { RecordProps } from "@/hooks/home/statistic/calendar-stats/useDateStats";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { Separator } from "tamagui";

const ProfileStudyTimeTotal = ({ records }: { records: RecordProps[] }) => {
  const totalStudyTime = useMemo(() => {
    return (
      records.reduce((acc, record) => {
        return acc + record.duration;
      }, 0) / 60
    );
  }, [records.length]);

  const totalRecords = useMemo(() => {
    return records.length;
  }, [records.length]);

  return (
    <View className="py-2 mb-4">
      <View className="border-emerald-500 rounded-2xl flex-row w-full py-4 border">
        <View className="center flex-1 gap-3">
          <Text>Total study time</Text>
          <View className="center flex-row gap-[6px]">
            <Text className="text-emerald-500 text-2xl font-semibold">
              {Math.round(totalStudyTime * 10) / 10}
            </Text>
            <Text>hours</Text>
          </View>
        </View>
        <Separator vertical />
        <View className="center flex-1 gap-3">
          <Text>Records time</Text>
          <View className="center flex-row gap-[6px]">
            <Text className="text-emerald-500 text-2xl font-semibold">
              {totalRecords}
            </Text>
            <Text>times</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileStudyTimeTotal;
