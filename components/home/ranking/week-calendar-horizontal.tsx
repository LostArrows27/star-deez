import { View, Text } from "react-native";
import React, { useCallback } from "react";
import StyledPressable from "@/components/styled-pressable";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  formatDate,
} from "date-fns";

export default function WeekCalendarHorizontals({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const firstDay = useCallback(() => {
    return startOfWeek(selectedDate, { weekStartsOn: 1 });
  }, [selectedDate]);

  const lastDay = useCallback(() => {
    return endOfWeek(selectedDate, { weekStartsOn: 1 });
  }, [selectedDate]);

  const handleSelectPreviousWeek = () => {
    setSelectedDate((prev) => subWeeks(prev, 1));
  };

  const handleSelectNextWeek = () => {
    setSelectedDate((prev) => addWeeks(prev, 1));
  };

  return (
    <View className="flex-row w-full justify-between items-center bg-green-100 py-2 px-4 rounded-lg">
      <View className="rounded-full w-fit overflow-hidden items-center justify-center">
        <StyledPressable
          style={{
            padding: 4,
            paddingLeft: 3,
          }}
          onPress={handleSelectPreviousWeek}
        >
          <ChevronLeft />
        </StyledPressable>
      </View>
      <Text className=" text-xl">
        {formatDate(firstDay(), "MMM dd")} - {formatDate(lastDay(), "MMM dd")}
      </Text>
      <View className="rounded-full w-fit overflow-hidden items-center justify-center">
        <StyledPressable
          style={{
            padding: 4,
            paddingRight: 3,
          }}
          onPress={handleSelectNextWeek}
        >
          <ChevronRight />
        </StyledPressable>
      </View>
    </View>
  );
}
