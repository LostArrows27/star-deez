import { View, Text } from "react-native";
import React from "react";

import { Input, View as ViewTama, XStack } from "tamagui";

import { Calendar } from "@tamagui/lucide-icons";

import DateTimePicker from "@/components/ui/date-picker";
import { useCreateStudyRecord } from "@/hooks/modal/tracking/useCreateStudyRecord";
const timeWithoutSecond = (date: Date) => {
  //remove seconds from to localeTimeString

  const time = date.toLocaleTimeString().split(":");
  const locale = date.toLocaleTimeString().split(" ");

  return `${time[0]}:${time[1]} ${locale[1]}`;
};

export default function StudyTimePicker() {

  const { date, setDate, time, setTime } = useCreateStudyRecord();
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
          {date ? date.toLocaleDateString() : "Date"}
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