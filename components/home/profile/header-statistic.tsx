import { useFollowerList } from "@/hooks/home/profile/useFollowerList";
import { useProfileData } from "@/hooks/home/profile/useProfileData";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { View, Text } from "react-native";
import { Separator } from "tamagui";

const HeaderStatistic = () => {
  const { countFollower, countFollowing } = useFollowerList();

  const [countPosts, setCountPosts] = useState(0);

  const { profile } = useProfileData();

  useGetInitData(async (user) => {
    if (!user || !profile) return;
    let query = supabase
      .from("study_records")
      .select("id", {
        count: "exact",
      })
      .eq("user_id", user.id);

    if (profile.id !== user.id) query = query.eq("visibility", "public");

    const { data, error } = await query;

    if (!error) {
      setCountPosts(data.length);
    }
  });

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
          {countPosts}
        </Text>
        <Text className="mt-2 text-sm tracking-wide text-gray-600">Posts</Text>
      </View>
    </View>
  );
};

export default HeaderStatistic;
