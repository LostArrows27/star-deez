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
import DateTimePicker from "@/components/ui/date-picker";

export default function WeekCalendarHorizontals({
  selectedDate,
  setSelectedDate,
  rangeMode,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  rangeMode?: boolean;
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
          <Text className=" text-xl">
            {rangeMode
              ? formatDate(
                  startOfWeek(subWeeks(selectedDate, 5), {
                    weekStartsOn: 1,
                  }),
                  "MMM dd"
                ) +
                " - " +
                formatDate(
                  startOfWeek(selectedDate, {
                    weekStartsOn: 1,
                  }),
                  "MMM dd"
                )
              : formatDate(firstDay(), "MMM dd") +
                " - " +
                formatDate(lastDay(), "MMM dd")}
          </Text>
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
