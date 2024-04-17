import { View } from "react-native";
import { Text } from "react-native";
import PostItem from "./post-item";
import { FlatList } from "react-native";
import { postData } from "../../../constants/Post";

const PostLists = () => {
  // TODO: custom infinite scroll
  return (
    <View className="w-full pb-[90px]">
      <FlatList
        className="h-full"
        showsVerticalScrollIndicator={false}
        data={postData}
        keyExtractor={(item) => item.id}
        renderItem={(data) => <PostItem {...data.item} />}
      />
    </View>
  );
};

export default PostLists;
