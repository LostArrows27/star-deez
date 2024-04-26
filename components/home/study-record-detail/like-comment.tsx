import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/auth/useAuth";
import StyledPressable from "@/components/styled-pressable";
import { Text } from "tamagui";

export default function LikeComment({
  comment_id,
  likes,
}: {
  comment_id: string;
  likes: number;
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
        .eq("comment_id", comment_id)
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
        comment_id: comment_id,
      });
      if (error) {
        console.log(error);
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
    <StyledPressable onPress={handleLike}>
      <Text
        color={liked ? "$color8" : "$color7"}
        fontWeight={liked ? "800" : "normal"}
      >
        {count !== 0 ? count : ""} Like
      </Text>
    </StyledPressable>
  );
}
