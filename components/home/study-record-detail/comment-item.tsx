import { TextInput, TouchableOpacity, View } from "react-native";
import React, {
  memo,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Avatar, Spinner, Text } from "tamagui";
import CommentInput from "./comment-input";
import StyledPressable from "@/components/styled-pressable";
import { Comment, Profile } from "@/types/supabase-util-types";
import renderValue from "./parseContent";
import { supabase } from "@/lib/supabase";
import { useRealTime } from "@/hooks/useRealTime";
import { useAuth } from "@/hooks/auth/useAuth";
import LikeComment from "./like-comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { Reply } from "@tamagui/lucide-icons";
import { useCommentControl } from "@/hooks/modal/study-record/useCommentControls";
import { cn } from "@/lib/utils";
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "Just now",
    m: "Just now",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mon",
    MM: "%dmon",
    y: "1y",
    yy: "%dy",
  },
});
function CommentItem({
  content,
  created_at,
  id,
  is_edited,
  modified_at,
  reply_comment_id,
  study_record_id,
  user_id,
  likes,
  profiles,
  highLightId,
}: {
  content: string;
  created_at: string;
  id: string;
  is_edited: boolean;
  modified_at: string | null;
  reply_comment_id: string | null;
  study_record_id: string;
  user_id: string;
  profiles: Profile;
  likes: { count: number }[];
  highLightId?: string;
}) {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [openReply, setOpenReply] = useState(false); //to show the "Read more & Less Line"
  const [subComments, setSubComments] = useState<Comment[]>([]);
  const [countSubComments, setCountSubComments] = useState(0);
  const { userDetails } = useAuth();
  const { setReplyComment, inputRef } = useCommentControl();
  const [loading, setLoading] = useState(false);
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
  }, []);

  useEffect(() => {
    (async () => {
      const { count } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("reply_comment_id", id);

      if (count) {
        setCountSubComments(count);
      }
    })();
    if (highLightId && highLightId !== id) {
      setOpenReply(true);
    }
  }, []);
  useEffect(() => {
    if (openReply) {
      (async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from("comments")
          .select("*, likes(count), profiles(id,avatar,first_name,last_name)")
          .eq("study_record_id", study_record_id)
          .eq("reply_comment_id", id)
          .order("created_at", { ascending: false });
        // if()
        if (error || !data) return console.log(error);

        setSubComments(data as Comment[]);
        setLoading(false);
      })();
    }
  }, [openReply]);

  useRealTime({
    channel: "subcomment_" + id!,
    table: "comments",
    filter: `reply_comment_id=eq.${id}`,
    onInsert: async (payload) => {
      const newComment = {
        ...payload.new,
        profiles: {
          avatar: userDetails?.avatar,
          first_name: userDetails?.first_name,
          last_name: userDetails?.last_name,
          id: userDetails?.id,
        },
        likes: [{ count: 0 }],
      };

      setSubComments((prev) => [newComment as Comment, ...prev]);
      setCountSubComments((prev) => prev + 1);
    },
    onDelete: async (payload) => {
      setSubComments((prev) =>
        prev.filter((item) => item.id !== payload.old.id)
      );
      setCountSubComments((prev) => prev - 1);
    },
  });
  return (
    <View className={cn(" w-full ")}>
      {highLightId === id && (
        <>
          <View className="absolute top-0 right-0 -left-20 bottom-0 bg-[#f5f5f5] "></View>
          <View className="absolute top-0  bottom-0 right-0 w-[2px] bg-green-500"></View>
        </>
      )}
      <View className="flex-row items-start">
        <Avatar
          style={{
            marginRight: 8,
          }}
          onPress={() => {
            //  navigation.openDrawer();
          }}
          circular
          size="$3"
        >
          <Avatar.Image
            src={
              profiles.avatar ||
              require("@/assets/images/header/placeholder.jpg")
            }
          />
          <Avatar.Fallback bc="$green9" />
        </Avatar>
        <View className="flex-1">
          <Text color={"$color9"} fontWeight={"700"}>
            {profiles.last_name} {profiles.first_name}
          </Text>

          <Text
            numberOfLines={textShown ? undefined : 3}
            onTextLayout={onTextLayout}
          >
            {renderValue(content, [
              {
                trigger: "@", // Should be a single character like '@' or '#'
                textStyle: { fontWeight: "bold", color: "rgb(48, 164, 108)" }, // The mention style in the input
              },
            ])}
          </Text>
          {lengthMore && (
            <TouchableOpacity onPress={toggleNumberOfLines}>
              <Text color={"$gray8Light"} width={"fit"}>
                {textShown ? "Read less" : "Read more"}
              </Text>
            </TouchableOpacity>
          )}

          <View className="flex-row gap-4 ">
            <Text color={"$gray9"}>{dayjs(created_at).fromNow(true)}</Text>
            <LikeComment
              comment_id={id}
              likes={likes[0].count}
              owner_id={user_id}
            />

            <StyledPressable
              onPress={() => {
                setReplyComment({
                  id: reply_comment_id ? reply_comment_id : id,
                  first_name: profiles.first_name,
                  last_name: profiles.last_name,
                  profile_id: profiles.id,
                });

                if (inputRef) {
                  (
                    inputRef as React.MutableRefObject<TextInput>
                  ).current.focus();
                }
              }}
            >
              <Text color={"$gray9"} fontWeight={openReply ? "800" : "normal"}>
                Reply
              </Text>
            </StyledPressable>
          </View>
          {!openReply && countSubComments > 0 && (
            <StyledPressable
              onPress={() => setOpenReply((pre) => !pre)}
              className="flex-row gap-2 mt-2"
            >
              <Reply
                size={"$1"}
                color={"$gray9"}
                fontWeight={"bold"}
                rotate="180deg"
              />
              <Text color={"$gray9"} fontWeight={"bold"}>
                See {countSubComments} replies
              </Text>
            </StyledPressable>
          )}
          {openReply && (
            <View className="gap-4 my-4">
              {!loading ? (
                subComments.length > 0 &&
                subComments.map((item) => (
                  <CommentItem
                    key={item.id}
                    {...item}
                    highLightId={
                      highLightId === item.id ? highLightId : undefined
                    }
                  />
                ))
              ) : (
                <View className=" items-center justify-center p-2">
                  <Spinner scale={1} size="large" color="$green10" />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default memo(CommentItem);
