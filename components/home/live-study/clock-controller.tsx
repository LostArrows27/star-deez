import { AntDesign } from "@expo/vector-icons";
import { useClockTimer } from "@/hooks/home/live-study/useManageStudyClock";
import { Check } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { Button, Text, Theme } from "tamagui";
import { Feather } from "@expo/vector-icons";
import ResetButton from "./reset-button";
import FinishButton from "./finish-button";
import { useParticipantsList } from "@/hooks/home/live-participants/useParticipantsList";
import { useAuth } from "@/hooks/auth/useAuth";

const ClockController = () => {
  const { isRunning, start, stop, reset } = useClockTimer();

  return (
    <View className="w-full px-[12%] pb-20 justify-between items-center flex-row">
      <View className="items-center gap-5">
        <FinishButton />
        <Text fontSize={"$4"} color={"$gray10Light"}>
          Finish
        </Text>
      </View>
      <View className="items-center gap-5">
        <Theme name={"orange"}>
          <Button
            onPress={async () => {
              isRunning ? stop() : start();
            }}
            borderRadius={99999999}
            borderWidth={2}
            alignItems="center"
            justifyContent="center"
            borderColor={"$color7"}
            p={10}
            w={"$6"}
            h={"$6"}
            icon={
              isRunning ? (
                <AntDesign name="pause" size={24} color="orange" />
              ) : (
                <Feather name="play" size={24} color="orange" />
              )
            }
            backgroundColor={"$colorTransparent"}
          ></Button>
        </Theme>
        <Text fontSize={"$4"} color={"$gray10Light"}>
          Pause
        </Text>
      </View>
      <View className="items-center gap-5">
        <ResetButton />
        <Text fontSize={"$4"} color={"$gray10Light"}>
          Reset
        </Text>
      </View>
    </View>
  );
};

export default ClockController;
