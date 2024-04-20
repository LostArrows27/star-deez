import { View } from "react-native";
import { Spinner } from "tamagui";

const LoadingScreen = () => {
  return (
    <View className="items-center justify-center h-screen">
      <Spinner scale={1.2} size="large" color="$green10" />
    </View>
  );
};

export default LoadingScreen;
