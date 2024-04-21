import { Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Profile } from "@/types/supabase-util-types";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import { useProfileData } from "@/hooks/home/profile/useProfileData";
import { Spinner } from "tamagui";
import { Image } from "expo-image";
import ProfileHeader from "@/components/home/profile/profile-header";
import ProfileFollower from "@/components/home/profile/profile-follower";
import { ScrollView } from "react-native";
import ProfileTabView from "@/components/home/profile/profile-tab-view";

const UserPage = () => {
  const params = useLocalSearchParams();

  const { profile, setProfile } = useProfileData();

  const { loading } = useGetInitData(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", params?.id || "")
      .returns<Profile>()
      .maybeSingle();

    if (!error && data) {
      setProfile(data);
    }
  });

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: loading
            ? ""
            : profile
            ? profile?.first_name + " " + profile?.last_name
            : "Not Found",
        }}
      />
      {loading ? (
        <View className="center flex-1 w-full">
          <Spinner scale={1.2} size="large" color="$green10" />
        </View>
      ) : profile ? (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
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
            source={require("@/assets/images/profile/nooo.gif")}
          />
          <Text className="text-xl font-semibold">
            Look like this user doesn't exist 🥲
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserPage;
