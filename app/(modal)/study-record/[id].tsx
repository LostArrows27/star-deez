import { View, Text, TouchableNativeFeedback, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import ModalWrapper from "@/components/modal/modal-wrapper";
import { Avatar, Button, Spinner } from "tamagui";
import {
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  Newspaper,
  ThumbsUp,
  TimerReset,
} from "@tamagui/lucide-icons";
import { StudyRecord } from "@/types/supabase-util-types";
import { supabase } from "@/lib/supabase";
import StyledText from "@/components/styled-text";
import { formatDate } from "date-fns";
import { Image } from "tamagui";
import convertMinute from "@/utils/convert-minute";
import CommentInput from "@/components/home/study-record-detail/comment-input";

export default function StudyRecordDetails() {
  const { id } = useGlobalSearchParams();
  const [data, setData] = React.useState<StudyRecord | null>();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    (async () => {
      const { data: post, error } = await supabase
        .from("study_records")
        .select(
          "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
        )
        .eq("id", id)
        .single();
      if (error || !post) return console.log(error);
      setData(post as StudyRecord);
      setLoading(false);
    })();
  }, [id]);
  return (
    <ModalWrapper
      className="flex-1 p-4 px-6  bg-white"
      options={{
        headerShown: true,
        headerTitle: "Study Record",
        animation: "slide_from_bottom",
        headerRight: () => <MoreVertical />,
      }}
    >
      <ScrollView>
        {loading || !data ? (
          <View className="items-center h-full justify-center ">
            <Spinner scale={1} size="large" color="$green10" />
          </View>
        ) : (
          <View className="border-emerald-200 w-full  pb-3 border-b">
            <View className="flex-row justify-between w-full">
              <View className="flex-row items-start gap-5">
                <Avatar circular size="$4">
                  <Avatar.Image src={data.profiles.avatar || ""} />
                  <Avatar.Fallback bc="$green9" />
                </Avatar>
                <View>
                  <Text className="text-lg font-[Inter]">
                    {data.profiles.last_name + " " + data.profiles.first_name}
                  </Text>
                  <StyledText fontSize={"$2"} color={"$gray10"}>
                    {formatDate(data.created_at, "dd/MM/yyyy HH:mm")}
                  </StyledText>
                </View>
              </View>
            </View>
            <View className="gap-4  mt-6">
              <Text className="text-lg ">{data.comment}</Text>
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
                    uri:
                      data.document.cover ||
                      require("@/assets/images/post.png"),
                    width: 60,
                    height: 80,
                  }}
                  className="w-[20px] h-[60px] object-cover object-center"
                />
                <View>
                  <StyledText>{data.document.title}</StyledText>
                  {data.duration && (
                    <View className="flex-row items-center gap-2 mt-4">
                      <TimerReset size={15} />
                      <StyledText>
                        {convertMinute(data.duration, true)}
                      </StyledText>
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
            <View className="flex-row pb-1 mt-4">
              <View className="flex-row items-center gap-2">
                <MessageSquare
                  color={"$gray8"}
                  className=" rotate-180"
                  size={24}
                />
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
        )}
        <CommentInput />
      </ScrollView>
    </ModalWrapper>
  );
}
