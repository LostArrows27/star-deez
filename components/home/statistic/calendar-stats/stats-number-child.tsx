import formatTime from "@/utils/format-time";
import { View, Text } from "react-native";

const StatsNumberChild = ({
  title,
  duration,
}: {
  title: string;
  duration: number;
}) => {
  return (
    <View className="center flex-1 gap-4 px-[5px] py-3 bg-green-100 rounded-md">
      <Text className="text-sm font-semibold text-green-500">{title}</Text>
      <Text className=" font-bold">{formatTime(duration)}</Text>
    </View>
  );
};

export default StatsNumberChild;
