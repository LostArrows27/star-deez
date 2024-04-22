import {
  Clock,
  MessageSquare,
  MoreHorizontal,
  Newspaper,
  ThumbsUp,
  TimerReset,
} from "@tamagui/lucide-icons";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { Avatar, Button, Image } from "tamagui";
import { formatDate, formatDistance } from "date-fns";
import convertMinute from "@/utils/convert-minute";
import StyledText from "@/components/styled-text";
import { StudyRecord } from "@/types/supabase-util-types";
import { router } from "expo-router";

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

const PostItem = (data: StudyRecord) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#d7d7d7", false)}
      onPress={() => {
        router.push(`/(modal)/study-record/${data.id}`);
      }}
      className="w-full h-full"
    >
      <View className="border-emerald-200 w-full p-5 pb-3 border-b">
        <View className="flex-row justify-between w-full">
          <View className="flex-row items-start gap-5">
            <Avatar circular size="$4">
              <Avatar.Image src={data.profiles.avatar || ""} />
              <Avatar.Fallback bc="$green9" />
            </Avatar>
            <Text className="text-lg font-[Inter]">
              {data.profiles.last_name + " " + data.profiles.first_name}
            </Text>
          </View>
          <View className="items-end">
            <Button h={"$2"} w={2} scaleIcon={1.5} icon={MoreHorizontal} />
            <View className=" mt-3">
              <StyledText fontSize={"$2"} color={"$gray10"}>
                {formatDate(data.created_at, "dd/MM/yyyy HH:mm")}
              </StyledText>
            </View>
          </View>
        </View>

        <View className="gap-4 pl-16 mt-6">
          <Text className="text-[17px] ">{data.comment}</Text>
          {data.image && (
            <View className="overflow-hidden w-full h-[150px] bg-red-500 rounded-md">
              <Image
                source={{
                  uri: data.image,
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
              <StyledText>{data.document.title}</StyledText>
              {data.duration && (
                <View className="flex-row items-center gap-2 mt-4">
                  <Clock size={15} />
                  <StyledText>{convertMinute(data.duration, true)}</StyledText>
                </View>
              )}
              <View className="flex-row items-center gap-2 mt-2">
                <Newspaper size={15} />
                <StyledText>
                  {data.begin_at !== 0
                    ? `${data.begin_at} ~ ${data.end_at} ${data.document?.unit.name}`
                    : `${data.end_at}  ${data.document?.unit.name}`}
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
            background={TouchableNativeFeedback.Ripple("#d7d7d7", false)}
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
                {data.likes[0].count}
              </StyledText>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default PostItem;
