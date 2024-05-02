import { View, Text, TouchableNativeFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { ThumbsUp } from "@tamagui/lucide-icons";
import StyledText from "@/components/styled-text";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/auth/useAuth";

export default function LikeButton({
  likes,
  study_record_id,
  owner_id,
}: {
  likes: number;
  study_record_id: string;
  owner_id: string;
}) {
  const [count, setCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const { userDetails } = useAuth();

  useEffect(() => {
    if (!userDetails?.id) return;
    (async () => {
      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", userDetails.id)
        .eq("study_record_id", study_record_id)
        .single();

      if (data) {
        setLiked(true);
      }
    })();
  }, [userDetails?.id]);

  const handleLike = async () => {
    if (!userDetails) return;
    if (!liked) {
      setLiked(true);
      setCount(count + 1);
      const { error } = await supabase.from("likes").insert({
        user_id: userDetails.id,
        study_record_id: study_record_id,
      });
      if (error) {
        return console.log(error);
      }

      if (userDetails.id !== owner_id) {
        //check if notification already exist
        const { data, error: error2 } = await supabase
          .from("notification")
          .select("id,content")
          .eq("receiver_id", owner_id)
          .eq("link_to", "/study-record/" + study_record_id)
          .like("content", "%like%")
          .maybeSingle();

        if (error2) {
          console.log(error2);
          return;
        }

        //decide whether to update or insert
        let content =
          count > 0
            ? `${userDetails.first_name} and ${count} others like your post`
            : `${userDetails.last_name} ${userDetails.first_name} likes your post`;
        if (data) {
          const { error: updateError } = await supabase
            .from("notification")
            .update({
              content: content,
              sender_id: userDetails.id,
              meta_data: {
                avatar: userDetails?.avatar,
              },
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
              link_to: "/study-record/" + study_record_id,
              content: content,
              meta_data: {
                avatar: userDetails?.avatar,
              },
              is_readed: false,
              is_seen: false,
            });
        }
      }
    } else {
      setCount(count - 1);
      setLiked(false);
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", userDetails.id)
        .eq("study_record_id", study_record_id);
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <TouchableNativeFeedback
      onPress={handleLike}
      background={TouchableNativeFeedback.Ripple("#d7d7d7", false)}
      className="rounded-xl flex flex-row items-center mt-2"
    >
      <View className="rounded-xl flex-row items-center gap-3 px-2 py-2 pr-4 ml-5">
        <ThumbsUp
          onPointerCancel={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTouchStart={(e) => {}}
          color={"$green8"}
          fill={liked ? "hsl(151, 49.3%, 46.5%)" : "transparent"}
          className="z-50 rotate-180"
          size={24}
        />

        <StyledText color={"$gray8"} fontSize={"$4"}>
          {count}
        </StyledText>
      </View>
    </TouchableNativeFeedback>
  );
}
