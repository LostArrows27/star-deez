import { View, Text } from "react-native";
import React from "react";
import PostLists from "@/components/home/newfeed/post-lists";

export default function following() {
  return <PostLists type="following" />;
}
