import { fakeFollowers } from "@/constants/Follower";
import { FlatList } from "react-native";
import { Text, View, Image } from "react-native";

// write function cut string to limit length -> 6

function cutString(str: string) {
  if (str.length > 6) {
    return str.slice(0, 6) + "...";
  }
  return str;
}

// TODO: fetch follower + link to user profile

const ProfileFollower = () => {
  return (
    <View className="w-full pb-8">
      <View className="bg-gray-100 h-[15px] w-full"></View>
      <View className="px-6 mt-3">
        <View className="flex-row items-center justify-between w-full">
          <Text className=" text-emerald-500 text-lg font-medium">
            Followers
          </Text>
          <Text className="text-base text-gray-500">View all</Text>
        </View>
        <FlatList
          scrollEnabled={fakeFollowers.length > 4}
          data={fakeFollowers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="center mr-9 gap-2 mt-6">
              <Image
                className="w-16 h-16 rounded-full"
                source={{ uri: item.avatar }}
              />
              <Text className="text-base text-center text-gray-500">
                {cutString(item.name)}
              </Text>
            </View>
          )}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default ProfileFollower;
