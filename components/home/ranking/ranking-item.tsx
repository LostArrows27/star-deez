import {
  View,
  Text,
  Animated,
  LayoutRectangle,
  Dimensions,
} from "react-native";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Avatar, Progress } from "tamagui";
import convertMinute from "@/utils/convert-minute";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
export interface RankItemProps {
  id: string;
  ranking: number;
  name: string;
  time: number;
  avatar: string;
  topTime: number;
}
const RankingItem = ({
  id,
  name,
  time,
  avatar,
  ranking,
  topTime,
}: RankItemProps) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue((time / topTime) * 100);
  }, [time, topTime]);

  return (
    <View
      className={cn("flex-row  py-2  h-fit justify-between gap-4 items-center")}
    >
      <View className=" items-center justify-center w-12 h-12 border border-green-400 rounded-full">
        <Text className=" text-2xl font-bold text-green-400">{ranking}</Text>
      </View>
      <View className="max-h-5 justify-center flex-1 gap-2">
        <View className="flex-row justify-between">
          <Text className="font-bold">{name}</Text>
          <Text>{convertMinute(time, true, false)}</Text>
        </View>
        <Progress size={"$4"} value={value}>
          <Progress.Indicator backgroundColor={"$color8"} animation="slow" />
        </Progress>
      </View>
      <Avatar
        onPress={() => {
          router.push(`/profile/${id}`);
        }}
        circular
        size="$3"
      >
        <Avatar.Image
          src={avatar || require("@/assets/images/ranking/gold.png")}
        />
        <Avatar.Fallback bc="$green9" />
      </Avatar>
    </View>
  );
};

export default RankingItem;
