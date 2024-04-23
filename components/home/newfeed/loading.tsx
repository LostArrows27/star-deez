import { View } from "react-native";
import { Spinner } from "tamagui";

const Loading = () => {
  return (
    <View className="items-center w-full bg-white">
      <View className=" items-center justify-center h-full">
        <Spinner scale={1} size="large" color="$green10" />
      </View>
    </View>
  );
};

export default Loading;
