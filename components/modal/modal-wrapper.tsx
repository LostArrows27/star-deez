import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import { StyleProp, View, ViewStyle } from "react-native";

type ModalWrapperProps = {
  children: React.ReactNode;
  options?: NativeStackNavigationOptions;
  style?: StyleProp<ViewStyle>;
  className?: string;
};

const ModalWrapper = ({
  options,
  className,
  style,
  children,
}: ModalWrapperProps) => {
  return (
    <View className={className} style={style}>
      <Stack.Screen options={options} />
      {children}
    </View>
  );
};

export default ModalWrapper;
