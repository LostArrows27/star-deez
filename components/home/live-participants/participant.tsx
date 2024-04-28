import StyledPressable from "@/components/styled-pressable";
import StyledView from "@/components/styled-view";
import useUserID from "@/hooks/auth/useUserID";
import { secondsToHMS } from "@/utils/second-to-string";
import { router } from "expo-router";
import { memo, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Avatar } from "tamagui";

const Participants = ({
  avatar,
  name,
  id,
  isRunning,
  studyTime,
}: {
  avatar: string;
  name: string;
  id: string;
  isRunning: boolean;
  studyTime?: number;
}) => {
  const userId = useUserID();

  const [time, setTime] = useState(studyTime ? studyTime : 0);

  useEffect(() => {
    setTime(studyTime ? studyTime : 0);
  }, [studyTime]);

  // useEffect update study time +1 every 1 second if the user is running

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTime(studyTime ? studyTime : 0);
    }
  }, [isRunning, time]);

  return (
    <StyledPressable
      onPress={() => {
        router.push(`/profile/${id}`);
      }}
      className=" items-center w-1/3 py-2"
    >
      <View className="relative">
        <Avatar
          pos={"absolute"}
          width={15}
          height={15}
          bottom={2}
          zIndex={999999999}
          right={"$0"}
          size={"$1"}
          elevation={"$4"}
          borderRadius={99999999}
          bg={"white"}
          justifyContent="center"
          alignItems="center"
        >
          <StyledView
            width={12}
            height={12}
            borderRadius={99999999}
            bg={isRunning ? "$green9" : "$orange9"}
          />
        </Avatar>
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
      <Text numberOfLines={1} className="mt-3 text-gray-400">
        {secondsToHMS(time)}
      </Text>
    </StyledPressable>
  );
};

export default memo(Participants);
