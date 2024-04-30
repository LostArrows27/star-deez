import { View } from "react-native";
import React from "react";
import convertMinute from "@/utils/convert-minute";
import { Image } from "expo-image";
import { Text } from "tamagui";

export default function RewardedLearners({
  id,
  name,
  time,
  top,
}: {
  id: string;
  name: string;
  time: number;
  top: number;
}) {
  return (
    <View className="items-center">
      <Image
        style={{
          width: top === 2 ? 192 / 2.3 : top == 1 ? 192 / 2.1 : 192 / 2.5,
          height: top === 2 ? 247 / 2.3 : top == 1 ? 247 / 2.1 : 247 / 2.5,
        }}
        contentFit="cover"
        source={
          top === 2
            ? require("@/assets/images/ranking/silver.png")
            : top == 1
            ? require("@/assets/images/ranking/gold.png")
            : require("@/assets/images/ranking/bronze.png")
        }
      />
      <Text className="font-bold text-center">{name}</Text>
      <Text
        className="font-bold text-center"
        textAlign="center"
        color="$color8"
      >
        {convertMinute(time, true, false)}
      </Text>
    </View>
  );
}
