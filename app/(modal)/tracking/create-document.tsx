import PickStatus from "@/components/home/tracking/create-document/pick-status";
import PickUnit from "@/components/home/tracking/create-document/pick-unit";
import UploadDocumentImage from "@/components/home/tracking/create-document/upload-document-image";
import ModalWrapper from "@/components/modal/modal-wrapper";
import { useAuth } from "@/hooks/auth/useAuth";
import { Text, View } from "react-native";
import { Input, TextArea } from "tamagui";

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
        <UploadDocumentImage />
        <Input
          height={"$5"}
          fontSize={"$5"}
          placeholder="Document title..."
          width={"100%"}
          mb={-10}
          fontWeight={"$15"}
        />
        <TextArea
          height={"$5"}
          fontSize={"$5"}
          placeholder="Document description..."
          width={"100%"}
        />
      </View>
      <View className="gap-4 mt-6">
        <PickStatus />
        <PickUnit />
      </View>
    </ModalWrapper>
  );
};

export default CartScreen;
