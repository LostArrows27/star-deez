import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Circle } from "tamagui";
import { Pen } from "@tamagui/lucide-icons";

export default function CreateStudyRecordBtn() {
  return (
    <Link asChild href={"/(modal)/tracking/create-study-record"}>
      <Circle
        size={50}
        backgroundColor={"$color8"}
        elevation="$1"
        pressStyle={{ backgroundColor: "$green7Light" }}
        overflow="hidden"
        position="absolute"
        bottom={30}
        right={30}
      >
        <Pen size={"$1"} color={"#fff"} />
      </Circle>
    </Link>
  );
}
