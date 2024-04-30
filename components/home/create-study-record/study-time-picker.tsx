import { View, Text } from "react-native";
import React, { useEffect } from "react";

import { Input, View as ViewTama, XStack } from "tamagui";
import { format } from "date-fns";

import { Calendar } from "@tamagui/lucide-icons";

import DateTimePicker from "@/components/ui/date-picker";
import { useCreateStudyRecord } from "@/hooks/modal/tracking/useCreateStudyRecord";
import { useLocalSearchParams } from "expo-router";
const timeWithoutSecond = (date: Date) => {
  return format(new Date(date), "h:mm a");
};

export default function StudyTimePicker() {
  const { date, setDate, time, setTime } = useCreateStudyRecord();
  const { learning_date } = useLocalSearchParams();

  useEffect(() => {
    if (learning_date) {
      setDate(new Date(learning_date as string));
    }
  }, [learning_date]);

  return (
    <XStack alignItems={"center"} justifyContent="flex-start" gap={"$2"}>
      <Calendar size={"$2"} color={"$color8"} />
      <DateTimePicker
        type="date"
        accentColor="green"
        textColor="green"
        onConfirm={setDate}
        buttonTextColorIOS="green"
      >
        <Input pointerEvents="none" editable={false} flexGrow={1}>
          {date ? format(date, "dd/MM/yyyy") : "Date"}
        </Input>
      </DateTimePicker>
      <DateTimePicker
        type="time"
        accentColor="green"
        textColor="green"
        onConfirm={setTime}
        buttonTextColorIOS="green"
      >
        <Input pointerEvents="none" editable={false} flexGrow={1}>
          {time ? timeWithoutSecond(time) : "Time"}
        </Input>
      </DateTimePicker>
    </XStack>
  );
}
