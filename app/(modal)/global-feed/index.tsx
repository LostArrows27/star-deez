import PostLists from "@/components/home/newfeed/post-lists";
import useUserID from "@/hooks/auth/useUserID";
import { Stack } from "expo-router";
import { View } from "react-native";

const Index = () => {
  const id = useUserID();

  return (
    <View>
      <Stack.Screen options={{ title: "Global Feed", headerShown: true }} />
      <PostLists profile_id={id} type="all" />
    </View>
  );
};

export default Index;
