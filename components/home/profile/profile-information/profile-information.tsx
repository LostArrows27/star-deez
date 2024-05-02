import StyledText from "@/components/styled-text";
import { useProfileData } from "@/hooks/home/profile/useProfileData";
import { format, formatDistanceToNowStrict } from "date-fns";
import { forwardRef } from "react";
import { View } from "react-native";
import { H4 } from "tamagui";
import { Image } from "expo-image";
import convertFlag from "@/utils/convert-flag-code";

const ProfileInformation = () => {
  const { profile } = useProfileData();

  return (
    <View className="w-full gap-10">
      <H4 px={"$4"} mt={20}>
        Basic information
      </H4>

      <View className="rounded-xl gap-8 px-6 py-6 mx-4 border border-green-500">
        <View className="flex-row items-center justify-between">
          <StyledText fontSize={"$3"} color={"$gray9Light"}>
            Full name
          </StyledText>
          <StyledText fontSize={"$5"} color={"$color9"}>
            {profile?.full_name}
          </StyledText>
        </View>
        <View className="flex-row items-center justify-between">
          <StyledText fontSize={"$3"} color={"$gray9Light"}>
            Country
          </StyledText>
          <View className="flex-row items-center gap-3">
            <StyledText fontSize={"$5"} color={"$color9"}>
              {profile?.country
                ? profile.country.split("~")[1]
                : "Not available"}
            </StyledText>
            {profile?.country && (
              <Image
                style={{
                  width: 32 / 1.5,
                  height: 24 / 1.5,
                }}
                source={convertFlag(profile.country.split("~")[0], 64, 48)}
              />
            )}
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <StyledText fontSize={"$3"} color={"$gray9Light"}>
            Gender
          </StyledText>
          <StyledText fontSize={"$5"} color={"$color9"}>
            {profile?.gender}
          </StyledText>
        </View>
        <View className="flex-row items-center justify-between">
          <StyledText fontSize={"$3"} color={"$gray9Light"}>
            DOB
          </StyledText>
          <StyledText fontSize={"$5"} color={"$color9"}>
            {format(new Date(profile?.dob!), "dd/MM/yyyy")}
          </StyledText>
        </View>
        <View className="flex-row items-center justify-between">
          <StyledText fontSize={"$3"} color={"$gray9Light"}>
            Joined for
          </StyledText>
          <StyledText fontSize={"$5"} color={"$color9"}>
            {formatDistanceToNowStrict(new Date(profile?.created_at!))}
          </StyledText>
        </View>
      </View>
      <View className="rounded-xl gap-8 px-6 py-6 mx-4 mb-10 border border-green-500">
        <View className="flex-row items-center justify-between">
          <StyledText fontSize={"$3"} color={"$gray9Light"}>
            Academic
          </StyledText>
          <StyledText fontSize={"$5"} color={"$color9"}>
            {profile?.academics
              ? profile.academics === "I'm not a student"
                ? "Not student"
                : profile.academics
              : "Not available"}
          </StyledText>
        </View>
        <View className="flex-row items-center justify-between gap-4">
          <StyledText fontSize={"$3"} color={"$gray9Light"}>
            School
          </StyledText>
          <StyledText numberOfLines={2} fontSize={"$5"} color={"$color9"}>
            {profile?.school
              ? profile.school.length > 30
                ? `${profile.school.slice(0, 30)}...`
                : profile.school
              : "Not available"}
          </StyledText>
        </View>
        <View className="flex-row items-center justify-between gap-4">
          <StyledText fontSize={"$3"} color={"$gray9Light"}>
            Current job
          </StyledText>
          <StyledText numberOfLines={2} fontSize={"$5"} color={"$color9"}>
            {profile?.job ? profile.job : "Not available"}
          </StyledText>
        </View>
      </View>
    </View>
  );
};

export default forwardRef(ProfileInformation);
