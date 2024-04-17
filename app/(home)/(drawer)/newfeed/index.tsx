import PostLists from "@/components/home/newfeed/post-lists";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

const Page = () => {
  return (
    <View>
      <View className="center p-4 bg-gray-600">
        <Text className="text-white">No navigation 🥲</Text>
      </View>
      <PostLists />
    </View>
  );
};

export default Page;
