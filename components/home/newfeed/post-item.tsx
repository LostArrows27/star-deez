import {
  Clock,
  MessageSquare,
  MoreHorizontal,
  Newspaper,
} from "@tamagui/lucide-icons";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { Avatar, Button, Image } from "tamagui";
import { formatDate } from "date-fns";
import convertMinute from "@/utils/convert-minute";
import StyledText from "@/components/styled-text";
import { router } from "expo-router";
import { memo } from "react";
import LikeButton from "./like-button";

export type PostItemProps = {
  id: string;
  profile_last_name: string;
  profile_first_name: string;
  profile_avatar: string;
  profile_id: string;
  comment: string;
  image: string;
  scrolling: boolean;
  document_title: string;
  document_unit_name: string;
  document_cover: string;
  duration: number;
  begin_at: number;
  end_at: number;
  created_at: string;
  comments: number;
  likes: number;
};

const PostItem = (data: PostItemProps) => {
  return (
    <TouchableNativeFeedback
      background={
        !data.scrolling
          ? TouchableNativeFeedback.Ripple("#d7d7d7", false)
          : TouchableNativeFeedback.Ripple("transparent", false)
      }
      onPress={() => {
        router.push(`/(modal)/study-record/${data.id}`);
      }}
      className="w-full h-full"
    >
      <View className="border-emerald-200 w-full p-5 pb-3 border-b">
        <View className="flex-row justify-between w-full">
          <View className="flex-row items-start gap-5">
            <Avatar circular size="$4">
              <Avatar.Image src={data.profile_avatar || ""} />
              <Avatar.Fallback bc="$green9" />
            </Avatar>
            <Text className="text-lg font-[Inter]">
              {data.profile_last_name + " " + data.profile_first_name}
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
          {data.comment && <Text className="text-[17px]">{data.comment}</Text>}
          {data.image && (
            <View className="overflow-hidden w-full h-[150px]  rounded-md">
              <Image
                resizeMethod="resize"
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
              resizeMethod="resize"
              source={{
                uri: data.document_cover || require("@/assets/images/post.png"),
                width: 40,
                height: 51,
              }}
              className="w-[20px] h-[60px] object-cover object-center"
            />

            <View>
              <StyledText>{data.document_title}</StyledText>
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
                    ? `${data.begin_at} ~ ${data.end_at} ${data.document_unit_name}`
                    : `${data.end_at}  ${data.document_unit_name}`}
                </StyledText>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row pb-1 pl-16 mt-4">
          <View className="flex-row items-center gap-2">
            <MessageSquare
              color={"$color8"}
              className=" rotate-180"
              size={24}
            />
            <StyledText color={"$gray8"} fontSize={"$4"}>
              {data.comments > 0 ? data.comments : "Comment"}
            </StyledText>
          </View>
          <LikeButton
            likes={data.likes}
            study_record_id={data.id}
            owner_id={data.profile_id}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default memo(PostItem);
