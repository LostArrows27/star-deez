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
import DateTimePicker from "@/components/ui/date-picker";

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
    <View className="flex-row items-center justify-between w-full px-4 py-2 bg-green-100 rounded-lg">
      <View className="w-fit items-center justify-center overflow-hidden rounded-full">
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
      <DateTimePicker
        type="date"
        accentColor="green"
        textColor="green"
        onConfirm={setSelectedDate}
        buttonTextColorIOS="green"
      >
        <View className="center">
          <Text className=" text-xl">{formatDate(selectedDate, "MMMM")}</Text>
        </View>
      </DateTimePicker>
      <View className="w-fit items-center justify-center overflow-hidden rounded-full">
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
