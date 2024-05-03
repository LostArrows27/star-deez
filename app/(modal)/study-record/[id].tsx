import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import ModalWrapper from "@/components/modal/modal-wrapper";
import { Adapt, Avatar, Button, Popover, Separator, Spinner } from "tamagui";
import { ScrollView } from "react-native-virtualized-view";
import {
  MessageSquare,
  MoreVertical,
  Newspaper,
  TimerReset,
} from "@tamagui/lucide-icons";
import { StudyRecord } from "@/types/supabase-util-types";
import { supabase } from "@/lib/supabase";
import StyledText from "@/components/styled-text";
import { formatDate } from "date-fns";
import { Image } from "tamagui";
import convertMinute from "@/utils/convert-minute";
import CommentInput from "@/components/home/study-record-detail/comment-input";
import LikeButton from "@/components/home/newfeed/like-button";
import CommentSection from "@/components/home/study-record-detail/comment-section";
import { useStudyRecordDetails } from "@/hooks/modal/study-record/useStudyRecordDetails";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToastController } from "@tamagui/toast";
import StyledPressable from "@/components/styled-pressable";
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";
import { FadeIn, FadeOut } from "react-native-reanimated";

export default function StudyRecordDetails() {
  const { id, fcID, ccID, flog } = useGlobalSearchParams();
  const [isOpen, setIsOpen] = React.useState(false);
  const { data, setData } = useStudyRecordDetails();
  const [loading, setLoading] = React.useState(true);
  const { userDetails } = useAuth();
  useEffect(() => {
    (async () => {
      if (!id) return;
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
  }, []);
  const toast = useToastController();
  const handleDeletePost = async () => {
    if (!data) return console.log("No data");
    const { error } = await supabase
      .from("study_records")
      .delete()
      .eq("id", data.id);
    if (error) {
      console.log("error", error);
    }
    setIsOpen(false);

    toast.show("Success!!", {
      message: `Deleted successfully`,
      native: false,
    });
    router.push("/(home)/(drawer)/newfeed/(tabs)/following");
  };
  return (
    <ModalWrapper
      className="flex-1 p-5 px-6 bg-white"
      options={{
        headerShown: true,

        headerTitle: "Study Record",
        animation: "slide_from_bottom",
        headerRight: () => (
          <StyledPressable
            onBlur={() => {
              setIsOpen(false);
            }}
            onPress={() => {
              setIsOpen(!isOpen);
            }}
          >
            <MoreVertical size={24} />
          </StyledPressable>
        ),
      }}
    >
      {loading || !data ? (
        <View className=" items-center justify-center h-full">
          <Spinner scale={1} size="large" color="$green10" />
        </View>
      ) : (
        <>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={{
              height: "100%",
            }}
            onTouchStart={() => {
              if (isOpen) setIsOpen(false);
            }}
          >
            <View className="border-green-500 w-full pb-3 border-b">
              <View className="flex-row justify-between w-full">
                <View className="flex-row items-start gap-5">
                  <Avatar
                    onPress={() => {
                      router.push(`/profile/${data.profiles.id}`);
                    }}
                    circular
                    size="$4"
                  >
                    <Avatar.Image src={data.profiles.avatar || ""} />
                    <Avatar.Fallback bc="$green9" />
                  </Avatar>
                  <View>
                    <Text
                      onPress={() => {
                        router.push(`/profile/${data.profiles.id}`);
                      }}
                      className="text-lg font-[Inter]"
                    >
                      {data.profiles.last_name + " " + data.profiles.first_name}
                    </Text>
                    <StyledText fontSize={"$2"} color={"$gray10"}>
                      {formatDate(data.created_at, "dd/MM/yyyy HH:mm")}
                    </StyledText>
                  </View>
                </View>
              </View>
              <View className="gap-4 mt-6">
                {data.comment && (
                  <Text className=" text-lg">{data.comment}</Text>
                )}
                {data.image && (
                  <View className="overflow-hidden w-full h-[150px]  rounded-md">
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
                    color={"$color8"}
                    className=" rotate-180"
                    size={24}
                  />
                  <StyledText color={"$gray8"} fontSize={"$4"}>
                    Comment
                  </StyledText>
                </View>
                <LikeButton
                  likes={data.likes[0].count}
                  study_record_id={data.id}
                  owner_id={data.profiles.id}
                />
              </View>
            </View>

            <CommentSection
              fatherCommentId={fcID as string | undefined}
              childCommentId={ccID as string | undefined}
            />
          </ScrollView>
          <CommentInput />
        </>
      )}
      {isOpen && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          onTouchStart={() => {
            setIsOpen(false);
          }}
          className="absolute bottom-0 justify-end right-0 left-0 top-0 bg-black/30"
        >
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            className=" h-fit p-4 bg-white"
          >
            <Text className=" text-lg font-semibold mb-2">Options</Text>
            <Separator />
            {userDetails?.id === data?.profiles.id && (
              <Button mt={"$3"} onPress={handleDeletePost}>
                <Text>Delete Post</Text>
              </Button>
            )}

            <Button mt={"$3"}>
              <Text>Report Post</Text>
            </Button>
          </Animated.View>
        </Animated.View>
      )}
    </ModalWrapper>
  );
}
