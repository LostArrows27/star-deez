import { useClockTimer } from "@/hooks/home/live-study/useManageStudyClock";
import { View } from "react-native";
import { Text, Button, H4 } from "tamagui";
import LiveParticipants from "./live-participants";

const FormatedTime = ({ timeString }: { timeString: string }) => {
  const hours = timeString.slice(0, 2);
  const minutes = timeString.slice(3, 5);
  const seconds = timeString.slice(6, 8);
  return (
    <View className="flex-row items-center gap-1 my-4">
      <View className="center w-24">
        <Text color={hours !== "00" ? "black" : "$gray5Light"} fontSize={"$11"}>
          {hours}
        </Text>
      </View>
      <Text fontSize={"$10"} color={hours !== "00" ? "black" : "$gray5Light"}>
        :
      </Text>
      <View className="center w-24">
        <Text
          color={minutes !== "00" ? "black" : "$gray5Light"}
          fontSize={"$11"}
        >
          {minutes}
        </Text>
      </View>
      <Text color={minutes !== "00" ? "black" : "$gray5Light"} fontSize={"$10"}>
        :
      </Text>
      <View className="center w-24">
        <Text
          color={seconds !== "00" ? "black" : "$gray5Light"}
          fontSize={"$11"}
        >
          {seconds}
        </Text>
      </View>
    </View>
  );
};

const LiveClock = () => {
  const timeString = useClockTimer().timeString;

  return (
    <View className="items-center mt-20">
      <H4 color={"$color8"}>Study Session</H4>
      <FormatedTime timeString={timeString} />
      <LiveParticipants />
    </View>
  );
};

export default LiveClock;
