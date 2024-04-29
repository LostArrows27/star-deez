import { View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import convertMinute from "@/utils/convert-minute";
import { Text } from "tamagui";
import RewardedLearners from "./rewarded-leaners";
import { cn } from "@/lib/utils";

type LearnersItems = {
  id: string;
  name: string;
  time: number;
};

export default function TopTierLearners({
  learners,
}: {
  learners: LearnersItems[];
}) {
  return (
    <View className="gap-5 my-5">
      <Text className="font-bold " fontSize={"$5"} fontWeight={"bold"}>
        Daily Top 3
      </Text>
      <View
        className={cn(
          "flex-row items-end justify-evenly gap-8",
          learners.length > 2 && "justify-between"
        )}
      >
        {learners.length > 2 ? (
          <>
            <RewardedLearners
              id={learners[1].id}
              name={learners[1].name.split(" ")[1]}
              time={learners[1].time}
              top={2}
            />
            <RewardedLearners
              id={learners[0].id}
              name={learners[0].name.split(" ")[1]}
              time={learners[0].time}
              top={1}
            />
            <RewardedLearners
              id={learners[2].id}
              name={learners[2].name.split(" ")[1]}
              time={learners[2].time}
              top={3}
            />
          </>
        ) : learners.length > 1 ? (
          <>
            <RewardedLearners
              id={learners[0].id}
              name={learners[0].name.split(" ")[1]}
              time={learners[0].time}
              top={1}
            />
            <RewardedLearners
              id={learners[1].id}
              name={learners[1].name.split(" ")[1]}
              time={learners[1].time}
              top={2}
            />
          </>
        ) : learners.length > 0 ? (
          <RewardedLearners
            id={learners[0].id}
            name={learners[0].name.split(" ")[1]}
            time={learners[0].time}
            top={1}
          />
        ) : (
          <View className="w-full items-center">
            <Text>No one learning yet</Text>
          </View>
        )}
      </View>
    </View>
  );
}
