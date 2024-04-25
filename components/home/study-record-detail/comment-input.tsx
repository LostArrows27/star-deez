import { Text } from "react-native";
import React from "react";
import { Input, View } from "tamagui";
import { Plane, Send, Smile } from "@tamagui/lucide-icons";

export default function CommentInput() {
  return (
    <View mt="$3">
      <View
        width={"100%"}
        justifyContent="center"
        columnGap="$2"
        pr="$2"
        alignItems="center"
        flexDirection="row"
      >
        <Input placeholder="Type something..." flex={1} />
        <Smile />
        <Send />
      </View>
    </View>
  );
}
