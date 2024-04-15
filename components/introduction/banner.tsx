import { Image } from "tamagui";
import { View } from "react-native";
import { Text } from "react-native";

const Banner = ({
  heading,
  content,
  image,
}: {
  heading: string;
  content: string;
  image: string;
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{
          uri: image,
        }}
        width="100%"
        paddingTop="100%"
        className=" object-cover object-center"
      />
      <View className="w-full h-10 bg-[rgb(247,247,247)]"></View>

      <View className="">
        <Text>{heading}</Text>
        <Text className="text-center text-blue-400">{content}</Text>
      </View>
    </View>
  );
};

export default Banner;
