import { useFollowerList } from "@/hooks/home/profile/useFollowerList";
import { View, Text } from "react-native";
import { Separator } from "tamagui";

const HeaderStatistic = () => {
  // TODO: fetch post count
  const { countFollower, countFollowing } = useFollowerList();

  return (
    <View className="flex-row w-full mt-8">
      <View className="center flex-1">
        <Text className="text-emerald-600 text-xl font-semibold tracking-wider">
          {countFollowing}
        </Text>
        <Text className="mt-2 text-sm tracking-wide text-gray-600">
          Following
        </Text>
      </View>
      <Separator vertical borderColor={"$gray5Light"} />
      <View className="center flex-1">
        <Text className="text-emerald-600 text-xl font-semibold tracking-wider">
          {countFollower}
        </Text>
        <Text className="mt-2 text-sm tracking-wide text-gray-600">
          Followers
        </Text>
      </View>
      <Separator vertical borderColor={"$gray5Light"} />
      <View className="center flex-1">
        <Text className="text-emerald-600 text-xl font-semibold tracking-wider">
          17
        </Text>
        <Text className="mt-2 text-sm tracking-wide text-gray-600">Posts</Text>
      </View>
    </View>
  );
};

export default HeaderStatistic;
