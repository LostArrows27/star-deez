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
      <View className="w-full h-4 bg-[rgb(247,247,247)] pb-6"></View>
      <View className=" items-center w-full gap-6 pt-12">
        <Text className="text-emerald-600 text-2xl font-bold tracking-widest text-center uppercase">
          {heading}
        </Text>
        <Text className="px-4 text-2xl leading-relaxed tracking-wider text-center text-gray-500">
          {content}
        </Text>
      </View>
    </View>
  );
};

export default Banner;
