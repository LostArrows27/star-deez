import ModalWrapper from "@/components/modal/modal-wrapper";
import { Text, View } from "react-native";
import { Input, TextArea } from "tamagui";

import { Image } from "tamagui";
const CartScreen = () => {
  return (
    <ModalWrapper
      className="flex-1 p-4 px-6 pt-12 bg-white"
      options={{
        headerShown: true,
        headerTitle: "Upload your document",
      }}
    >
      <View className="center gap-y-10 w-full">
        <Image
          source={{
            uri: require("@/assets/images/post.png"),
            width: 80,
            height: 102,
          }}
          className="w-[50px] h-[150px] object-cover object-center"
        />
        <Input
          height={"$5"}
          fontSize={"$5"}
          placeholder="Document title..."
          width={"100%"}
          mb={-10}
          fontWeight={"$15"}
        />
        <TextArea
          height={"$6"}
          fontSize={"$4"}
          placeholder="Document description..."
          width={"100%"}
        />
      </View>
    </ModalWrapper>
  );
};

export default CartScreen;
