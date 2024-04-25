import { View } from "react-native";
import React from "react";
import { Text } from "tamagui";

export default function CommentOptions({
  setOpenReply,
}: {
  setOpenReply: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <View className="flex-row gap-4">
      <Text color={"$color8"}>4m</Text>
      <Text color={"$color8"}>Like</Text>
      <Text color={"$color8"} onPress={() => setOpenReply(true)}>
        Reply
      </Text>
    </View>
  );
}
