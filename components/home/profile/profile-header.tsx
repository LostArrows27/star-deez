import StyledText from "@/components/styled-text";
import { useAuth } from "@/hooks/auth/useAuth";
import { useProfileData } from "@/hooks/home/profile/useProfileData";
import {
  Edit3,
  MessageCircle,
  MessageSquareText,
  Share2,
} from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { View, Text } from "react-native";
import { Button } from "tamagui";
import HeaderStatistic from "./header-statistic";
import FollowStatusButton from "./follow-status-button";
import { router } from "expo-router";
import convertFlag from "@/utils/convert-flag-code";

const ProfileHeader = () => {
  const { profile } = useProfileData();

  const { userDetails } = useAuth();

  return (
    <View className="center relative pb-8">
      <Image
        style={{
          width: "100%",
          height: 120,
        }}
        contentFit="cover"
        contentPosition={"bottom"}
        source={profile?.cover || require("@/assets/images/profile/cover.jpg")}
      />
      <View className="absolute h-[120px] top-0 bg-black/40 z-[4] w-full"></View>
      <View className="absolute top-[80px] z-50">
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 99999999,
            borderColor: profile?.gender === "female" ? "#ec4899" : "#3b82f6",
            borderWidth: 3,
          }}
          contentFit="cover"
          source={profile?.avatar}
        />
      </View>
      <Text className="text-emerald-500 mt-[56px] pt-6 pb-3 px-3 text-3xl font-semibold text-center">
        {profile?.last_name} {profile?.first_name}
      </Text>
      <StyledText color={"$gray9Light"} textAlign="center" lineHeight={"$7"}>
        {profile?.bio ? profile?.bio : "Nah, I'd have bio 🤓"}
      </StyledText>
      <View className="center flex-row justify-between w-full gap-8 mt-6">
        {userDetails?.id !== profile?.id ? (
          <>
            <Button
              borderRadius={99999999}
              width={"$4"}
              height={"$4"}
              borderColor={"$green6Light"}
              backgroundColor={"white"}
              icon={
                !profile?.country ? (
                  <MessageSquareText scale={1.3} color={"$green7Light"} />
                ) : (
                  <Image
                    style={{
                      width: 32 / 1.5,
                      height: 24 / 1.5,
                    }}
                    source={convertFlag(profile.country.split("~")[0], 64, 48)}
                  />
                )
              }
            ></Button>
            <FollowStatusButton />
            <Button
              borderRadius={99999999}
              width={"$4"}
              height={"$4"}
              borderColor={"$green6Light"}
              backgroundColor={"white"}
              icon={<Share2 scale={1.3} color={"$green7Light"} />}
            ></Button>
          </>
        ) : (
          <Button
            icon={<Edit3 />}
            themeInverse
            pressStyle={{
              backgroundColor: "$green8Light",
            }}
            onPress={() => {
              router.push("/edit-profile/");
            }}
            backgroundColor={"$green9Light"}
            borderRadius={"$9"}
            size={"$4"}
            width={"$12"}
          >
            Edit profile
          </Button>
        )}
      </View>
      <HeaderStatistic />
    </View>
  );
};

export default ProfileHeader;
