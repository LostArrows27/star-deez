import StyledPressable from "@/components/styled-pressable";
import { fakeFollowers } from "@/constants/Follower";
import { useFollowerList } from "@/hooks/home/profile/useFollowerList";
import { router } from "expo-router";
import { FlatList } from "react-native";
import { Text, View, Image } from "react-native";

// write function cut string to limit length -> 6

function cutString(str: string) {
  if (str.length > 6) {
    return str.slice(0, 6) + "...";
  }
  return str;
}

const ProfileFollower = () => {
  const { followers } = useFollowerList();

  return (
    <View className="w-full pb-8">
      <View className="bg-gray-100 h-[15px] w-full"></View>
      <View className="px-6 mt-3">
        <View className="flex-row items-center justify-between w-full">
          <Text className=" text-emerald-500 text-lg font-medium">
            Followers
          </Text>
          {followers.length > 0 && (
            <Text className="text-base text-gray-500">View all</Text>
          )}
        </View>
        {followers.length > 0 ? (
          <FlatList
            scrollEnabled={followers.length > 4}
            data={followers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <StyledPressable
                onPress={() => {
                  router.replace(`/profile/${item.id}`);
                }}
                className="center gap-2 pr-4 mt-6 mr-5"
              >
                <Image
                  className="w-16 h-16 rounded-full"
                  source={{ uri: item.avatar }}
                />
                <Text className="text-base text-center text-gray-500">
                  {cutString(
                    item.full_name || item.first_name + " " + item.last_name
                  )}
                </Text>
              </StyledPressable>
            )}
            horizontal={true}
          />
        ) : (
          <Text className="mt-5 text-gray-400">No followers</Text>
        )}
      </View>
    </View>
  );
};

export default ProfileFollower;
