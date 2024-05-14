import { Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Profile } from "@/types/supabase-util-types";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import { useProfileData } from "@/hooks/home/profile/useProfileData";
import { H3, Spinner } from "tamagui";
import { Image } from "expo-image";
import ProfileHeader from "@/components/home/profile/profile-header";
import ProfileFollower from "@/components/home/profile/profile-follower";
import { ScrollView } from "react-native";
import ProfileTabView from "@/components/home/profile/profile-tab-view";
import { useFollowStatus } from "@/hooks/home/profile/useFollowStatus";
import { useFollowerList } from "@/hooks/home/profile/useFollowerList";
import StyledText from "@/components/styled-text";

const UserPage = () => {
  const params = useLocalSearchParams();

  const { profile, setProfile } = useProfileData();

  const { setIsFollowing } = useFollowStatus();

  const { setFollowers, setCountFollower, setCountFollowing } =
    useFollowerList();

  const { loading } = useGetInitData(async (user) => {
    if (!params?.id) return;
    const getProfileData = supabase
      .from("profiles")
      .select("*")
      .eq("id", params?.id || "")
      .returns<Profile>()
      .maybeSingle();

    const getFollowerList = supabase
      .from("follower")
      .select("*, profiles!public_follower_user_id_fkey(*)")
      .eq("follower_id", params?.id);

    const getFollowingNumber = supabase
      .from("follower")
      .select("*")
      .eq("user_id", params?.id);

    const [profileRes, followerListRes, followingNumberRes] = await Promise.all(
      [getProfileData, getFollowerList, getFollowingNumber]
    );

    if (!profileRes.error && profileRes.data) {
      setProfile(profileRes.data);
    }

    if (!followerListRes.error) {
      setFollowers(followerListRes.data.map((item) => item.profiles!));
      setCountFollower(followerListRes.data.length);
    }

    if (!followingNumberRes.error) {
      setCountFollowing(followingNumberRes.data.length);
    }

    if (user.id !== params?.id) {
      const { data, error } = await supabase
        .from("follower")
        .select("*")
        .eq("user_id", user?.id)
        .eq("follower_id", params?.id)
        .maybeSingle();

      if (!error) {
        setIsFollowing(data ? true : false);
      }
    }
  });

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        getId={({ params }) => String(Date.now())}
        options={{
          headerTitle: loading
            ? ""
            : profile
            ? profile?.last_name + " " + profile?.first_name
            : "Not Found",
        }}
      />
      {loading ? (
        <View className="center flex-1 w-full">
          <Spinner scale={1.2} size="large" color="$green10" />
        </View>
      ) : profile ? (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          <ProfileHeader />
          <ProfileFollower />
          <ProfileTabView />
        </ScrollView>
      ) : (
        <View className="center w-full pt-20">
          <Image
            autoplay
            style={{
              width: 300,
              height: 300,
            }}
            contentFit="cover"
            source={require("@/assets/images/profile/cat_bubble.png")}
          />
          <H3 color={"$color8"} my={10} mt={30}>
            Not found user
          </H3>
          <StyledText color={"$gray10Light"}>
            Look like this user doesn't exist 🥲
          </StyledText>
        </View>
      )}
    </View>
  );
};

export default UserPage;
