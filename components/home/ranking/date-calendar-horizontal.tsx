import { View, Text } from "react-native";
import React from "react";
import StyledPressable from "@/components/styled-pressable";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import { formatDate } from "date-fns";

export default function DateCalendarHorizontal({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSelectPreviousDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() - 86400000));
  };

  const handleSelectNextDay = () => {
    setSelectedDate((prev) => new Date(prev.getTime() + 86400000));
  };
  return (
    <View className="flex-row w-full justify-between items-center bg-gray-200 py-2 px-4 rounded-lg">
      <View className="rounded-full w-fit overflow-hidden items-center justify-center">
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
      <Text className=" text-xl">{formatDate(selectedDate, "MMM dd")}</Text>
      <View className="rounded-full w-fit overflow-hidden items-center justify-center">
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
