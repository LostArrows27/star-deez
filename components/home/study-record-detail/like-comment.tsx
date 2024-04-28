import { Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/auth/useAuth";
import StyledPressable from "@/components/styled-pressable";
import { Text } from "tamagui";
import { Heart } from "@tamagui/lucide-icons";

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
    <>
      <StyledPressable onPress={handleLike}>
        <Text
          color={liked ? "$red9" : "$gray9"}
          fontWeight={liked ? "800" : "normal"}
        >
          {liked ? "Liked" : "Like"}
        </Text>
      </StyledPressable>

      <View className="right-0 absolute items-center  flex-row gap-2">
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
