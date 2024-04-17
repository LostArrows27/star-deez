import { TouchableNativeFeedback, View, Text } from "react-native";

export const CustomTabBarButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: (e: any) => void;
}) => (
  <View className=" flex-1 overflow-hidden">
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#e4e4e7", false, 90)}
      className="center flex-1 h-full pt-1"
      onPress={onPress}
    >
      <View className="center rounded-3xl flex-col flex-1 w-full pt-1 pb-2 overflow-hidden">
        {children}
      </View>
    </TouchableNativeFeedback>
  </View>
);
