import { Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/auth/useAuth";
import StyledPressable from "@/components/styled-pressable";
import { Text } from "tamagui";
import { Heart } from "@tamagui/lucide-icons";
import { useStudyRecordDetails } from "@/hooks/modal/study-record/useStudyRecordDetails";
import { useCommentControl } from "@/hooks/modal/study-record/useCommentControls";

export default function LikeComment({
  comment_id,
  likes,
  owner_id,
}: {
  comment_id: string;
  likes: number;
  owner_id: string;
}) {
  const [count, setCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const { data: details } = useStudyRecordDetails();
  const { replyComment } = useCommentControl();
  const { userDetails } = useAuth();

  useEffect(() => {
    if (!userDetails?.id) return;
    (async () => {
      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", userDetails.id)
        .eq("comment_id", comment_id)
        .single();

      if (data) {
        setLiked(true);
      }
    })();
  }, [userDetails?.id]);
  const handleLike = async () => {
    if (!userDetails || !details) return;
    if (!liked) {
      setLiked(true);
      setCount(count + 1);
      const { error } = await supabase.from("likes").insert({
        user_id: userDetails.id,
        comment_id: comment_id,
      });
      if (error) {
        console.log(error);
      }

      //check if notification already exist
      const { data, error: error2 } = await supabase
        .from("notification")
        .select("id,content")
        .eq("receiver_id", owner_id)
        .eq("link_to", "/study-record/" + details.id + "?fcID=%")
        .like("content", "%like%")
        .maybeSingle();

      if (error2) {
        console.log(error2);
        return;
      }

      //decide whether to update or insert
      let content =
        count > 0
          ? `${userDetails.first_name} and ${count} others like your comment`
          : `${userDetails.last_name} ${userDetails.first_name} likes your comment`;
      if (data) {
        const { error: updateError } = await supabase
          .from("notification")
          .update({
            content: content,
            sender_id: userDetails.id,
            meta_data: {
              avatar: userDetails?.avatar,
            },
            link_to:
              "/study-record/" +
              details.id +
              "?fcID=" +
              (replyComment
                ? replyComment.id + "&ccID=" + comment_id
                : comment_id),
            is_readed: false,
            is_seen: false,
          })
          .eq("id", data.id);
      } else {
        const { error: updateError } = await supabase
          .from("notification")
          .insert({
            receiver_id: owner_id,
            sender_id: userDetails.id,
            link_to:
              "/study-record/" +
              details.id +
              "?fcID=" +
              (replyComment
                ? replyComment.id + "&ccID=" + comment_id
                : comment_id),
            content: content,
            meta_data: {
              avatar: userDetails?.avatar,
            },
            is_readed: false,
            is_seen: false,
          });
      }
    } else {
      setCount(count - 1);
      setLiked(false);
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", userDetails.id)
        .eq("comment_id", comment_id);
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <StyledPressable onPress={handleLike}>
        <Text
          color={liked ? "$red9" : "$gray9"}
          fontWeight={liked ? "800" : "normal"}
        >
          {liked ? "Liked" : "Like"}
        </Text>
      </StyledPressable>

      <View className="right-2 absolute items-center  flex-row gap-2">
        {count > 0 && (
          <Text
            color={liked ? "$black " : "$gray9"}
            fontWeight={liked ? "800" : "normal"}
          >
            {count}
          </Text>
        )}
        <Pressable onPress={handleLike} hitSlop={20}>
          <Heart
            size={"$1"}
            fill={liked ? "red" : "transparent"}
            color={liked ? "$red9" : "$gray9"}
          />
        </Pressable>
      </View>
    </>
  );
}
