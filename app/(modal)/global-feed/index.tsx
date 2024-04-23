import PostLists from "@/components/home/newfeed/post-lists";
import { Stack } from "expo-router";
import { View } from "react-native";

const Index = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Global Feed", headerShown: true }} />
      <PostLists type="following" />-
    </View>
  );
};

export default Index;
