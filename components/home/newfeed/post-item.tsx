import {
  MessageSquare,
  MoreHorizontal,
  Newspaper,
  ThumbsUp,
  TimerReset,
} from "@tamagui/lucide-icons";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { Avatar, Button, Image } from "tamagui";
import { formatDistance } from "date-fns";
import convertMinute from "@/utils/convert-minute";
import StyledText from "@/components/styled-text";

export type PostItem = {
  avatar: string;
  name: string;
  time: Date;
  document: {
    cover?: string;
    name: string;
    unit: string;
  };
  learning_amount: number;
  learning_duration?: number; // in minutes
  like: number;
  media?: string;
};

const PostItem = (data: PostItem) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#e4e4e7", false)}
      className="w-full h-full"
    >
      <View className="border-emerald-200 w-full p-5 pb-3 border-b">
        <View className="flex-row justify-between w-full">
          <View className="flex-row items-start gap-5">
            <Avatar circular size="$4">
              <Avatar.Image src={data.avatar} />
              <Avatar.Fallback bc="$green9" />
            </Avatar>
            <Text className="text-lg font-[Inter]">{data.name}</Text>
          </View>
          <View className="items-end">
            <Button h={"$2"} w={2} scaleIcon={1.5} icon={MoreHorizontal} />
            <View className=" mt-3">
              <StyledText fontSize={"$2"} color={"$gray10"}>
                {formatDistance(data.time, new Date())} ago
              </StyledText>
            </View>
          </View>
        </View>
        <View className="gap-4 pl-16 mt-4">
          {data.media && (
            <View className="overflow-hidden w-full h-[150px] bg-red-500 rounded-md">
              <Image
                source={{
                  uri: data.media,
                  width: 100,
                  height: 50,
                }}
                width={"100%"}
                height={"100%"}
                className="rounded-2xl object-cover object-center w-full h-full"
              />
            </View>
          )}
          <View className="rounded-2xl border-emerald-500 px-7 flex-row w-full gap-4 p-5 border">
            <Image
              source={{
                uri: data.document.cover || require("@/assets/images/post.png"),
                width: 40,
                height: 51,
              }}
              className="w-[20px] h-[60px] object-cover object-center"
            />
            <View>
              <StyledText>{data.document.name}</StyledText>
              {data.learning_duration && (
                <View className="flex-row items-center gap-2 mt-4">
                  <TimerReset size={15} />
                  <StyledText>
                    {convertMinute(data.learning_duration)}
                  </StyledText>
                </View>
              )}
              <View className="flex-row items-center gap-2 mt-2">
                <Newspaper size={15} />
                <StyledText>
                  {data.learning_amount}{" "}
                  {data.learning_amount > 1
                    ? data.document.unit + "s"
                    : data.document.unit}
                </StyledText>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row pb-1 pl-16 mt-4">
          <View className="flex-row items-center gap-2">
            <MessageSquare color={"$gray8"} className=" rotate-180" size={24} />
            <StyledText color={"$gray8"} fontSize={"$4"}>
              Comment
            </StyledText>
          </View>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#e4e4e7", false)}
            className="rounded-xl flex flex-row items-center mt-2"
          >
            <View className="rounded-xl flex-row items-center gap-3 px-2 py-2 pr-4 ml-5">
              <ThumbsUp
                onPointerCancel={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                color={"$green7"}
                className="z-50 rotate-180"
                size={24}
              />
              <StyledText color={"$gray8"} fontSize={"$4"}>
                {data.like}
              </StyledText>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default PostItem;
