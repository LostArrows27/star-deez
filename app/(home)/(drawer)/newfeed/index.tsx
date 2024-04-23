import PostLists from "@/components/home/newfeed/post-lists";
import useUserID from "@/hooks/auth/useUserID";
import { View } from "@tamagui/core";
import { Stack } from "expo-router";

const Page = () => {
  const id = useUserID();

  return <PostLists type="following" profile_id={id} />;
};

export default Page;
