import { View } from "react-native";
import { Text } from "tamagui";
import ResetButton from "./reset-button";
import FinishButton from "./finish-button";
import StartStopButton from "./start-stop-button";

const ClockController = () => {
  return (
    <View className="w-full px-[12%] pb-20 justify-between items-center flex-row">
      <View className="items-center gap-5">
        <FinishButton />
        <Text fontSize={"$4"} color={"$gray10Light"}>
          Finish
        </Text>
      </View>
      <View className="items-center gap-5">
        <StartStopButton />
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
