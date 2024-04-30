import { View, Text } from "react-native";
import React from "react";
import StyledPressable from "@/components/styled-pressable";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import { formatDate, subWeeks } from "date-fns";
import DateTimePicker from "@/components/ui/date-picker";
import { Input } from "tamagui";

export default function DateCalendarHorizontal({
  selectedDate,
  setSelectedDate,
  rangeMode,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  rangeMode?: boolean;
}) {
  const handleSelectPreviousDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() - 86400000));
  };

  const handleSelectNextDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() + 86400000));
  };
  return (
    <View className="flex-row items-center justify-between w-full px-4 py-2 bg-green-100 rounded-lg">
      <View className="w-fit items-center justify-center overflow-hidden rounded-full">
        <StyledPressable
          style={{
            padding: 4,
            paddingLeft: 3,
          }}
          onPress={handleSelectPreviousDay}
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
            {rangeMode && formatDate(subWeeks(selectedDate, 1), "MMM dd")} -{" "}
            {formatDate(selectedDate, "MMM dd")}
          </Text>
        </View>
      </DateTimePicker>
      <View className="w-fit items-center justify-center overflow-hidden rounded-full">
        <StyledPressable
          style={{
            padding: 4,
            paddingRight: 3,
          }}
          onPress={handleSelectNextDay}
        >
          <ChevronRight />
        </StyledPressable>
      </View>
    </View>
  );
}
