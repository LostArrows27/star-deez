import { View, Text } from "react-native";
import React from "react";

import { Input, View as ViewTama, XStack } from "tamagui";

import { Calendar } from "@tamagui/lucide-icons";

import DateTimePicker from "@/components/ui/date-picker";
const timeWithoutSecond = (date: Date) => {
  //remove seconds from to localeTimeString

  const time = date.toLocaleTimeString().split(":");
  const locale = date.toLocaleTimeString().split(" ");

  return `${time[0]}:${time[1]} ${locale[1]}`;
};
export default function StudyTimePicker({
  date,
  time,
  setDate,
  setTime,
}: {
  date: Date;
  time: Date;
  setDate: (date: Date) => void;
  setTime: (date: Date) => void;
}) {
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
          {date.toLocaleDateString()}
        </Input>

        {/* <Button
        scaleIcon={2.5}
        px={10}
        height={"$5"}
        fontSize={"$4"}
        justifyContent="flex-start"
        icon={<Clock size={24} color={"$color8"} />}
        chromeless
      >
        {date ? date.toLocaleDateString() : "mm/dd/yyyy"}
      </Button> */}
      </DateTimePicker>
      <DateTimePicker
        type="time"
        accentColor="green"
        textColor="green"
        onConfirm={setTime}
        buttonTextColorIOS="green"
      >
        <Input pointerEvents="none" editable={false} flexGrow={1}>
          {timeWithoutSecond(time)}
        </Input>
      </DateTimePicker>
    </XStack>
  );
}
