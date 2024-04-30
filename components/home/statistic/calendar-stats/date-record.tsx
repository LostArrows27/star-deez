import StyledText from "@/components/styled-text";
import { RecordProps } from "@/hooks/home/statistic/calendar-stats/useDateStats";
import formatTime from "@/utils/format-time";
import { ChevronRight } from "@tamagui/lucide-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import { memo } from "react";
import { View, Text } from "react-native";
import { Button } from "tamagui";

type DateRecord = Omit<RecordProps, "document"> & {
  document: string | null;
};

const DateRecord = ({
  id,
  created_at,
  time,
  duration,
  document,
}: DateRecord) => {
  return (
    <Button
      justifyContent="space-between"
      borderColor={"$color5"}
      borderWidth={"$1"}
      size={"$5"}
      w={"100%"}
      h={"$9"}
      pr={0}
      onPress={() => {
        router.push(`/study-record/${id}`);
      }}
    >
      <View className="w-4/5 gap-2">
        <StyledText color={"$color9"} fontWeight={"$4"} numberOfLines={2}>
          {/* time HH:MM in time */}
          {format(time ? time : created_at, "HH:mm")}
        </StyledText>
        <Text className="text-lg font-bold" numberOfLines={1}>
          {document} study
        </Text>
        <Text>{formatTime(duration)}</Text>
      </View>
      <View className="center h-full pr-2">
        <ChevronRight color={"$gray10Light"} size={40} />
      </View>
    </Button>
  );
};

export default memo(DateRecord);
