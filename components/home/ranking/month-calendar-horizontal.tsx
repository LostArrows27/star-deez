import { View, Text } from "react-native";
import React, { useCallback } from "react";
import StyledPressable from "@/components/styled-pressable";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  formatDate,
} from "date-fns";

export default function MonthCalendarHorizontal({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSelectPreviousWeek = () => {
    setSelectedDate((prev) => subMonths(prev, 1));
  };

  const handleSelectNextWeek = () => {
    setSelectedDate((prev) => addMonths(prev, 1));
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
      <Text className=" text-xl">{formatDate(selectedDate, "MMMM")}</Text>
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
