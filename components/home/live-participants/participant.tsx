import StyledPressable from "@/components/styled-pressable";
import useUserID from "@/hooks/auth/useUserID";
import { router } from "expo-router";
import { memo } from "react";
import { View, Text } from "react-native";
import { Avatar } from "tamagui";

const Participants = ({
  avatar,
  name,
  id,
}: {
  avatar: string;
  name: string;
  id: string;
}) => {
  const userId = useUserID();

  return (
    <StyledPressable
      onPress={() => {
        router.push(`/profile/${id}`);
      }}
      className=" items-center w-1/3 py-2"
    >
      <View>
        <Avatar
          borderColor={id === userId ? "$color8" : "$colorTransparent"}
          borderWidth={2.5}
          elevation={"$0.75"}
          circular
          size="$6"
        >
          <Avatar.Image src={avatar} />
          <Avatar.Fallback bc="$green9" />
        </Avatar>
      </View>
      <Text numberOfLines={1} className="mt-3 text-gray-400">
        {name}
      </Text>
    </StyledPressable>
  );
};

export default memo(Participants);
