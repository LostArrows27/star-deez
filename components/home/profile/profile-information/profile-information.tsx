import StyledText from "@/components/styled-text";
import { useProfileData } from "@/hooks/home/profile/useProfileData";
import { format, formatDistanceToNowStrict } from "date-fns";
import { forwardRef } from "react";
import { View } from "react-native";
import { H4 } from "tamagui";

const ProfileInformation = () => {
  const { profile } = useProfileData();

  return (
    <View className="w-full gap-10">
      <H4 px={"$4"} mt={20}>
        Basic information
      </H4>

      <View className="rounded-xl gap-8 px-6 py-6 mx-4 mb-10 border border-green-500">
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
    </View>
  );
};

export default forwardRef(ProfileInformation);
