import ModalWrapper from "@/components/modal/modal-wrapper";
import { Link } from "expo-router";
import { Text } from "react-native";
import { Button } from "tamagui";

const CartScreen = () => {
  return (
    <ModalWrapper
      className="flex-1 p-4 pt-6 bg-white"
      options={{
        headerShown: true,
        headerTitle: "Searching document",
      }}
    >
      <Link asChild href={"/(modal)/tracking/create-document"}>
        <Button>Upload documents</Button>
      </Link>
    </ModalWrapper>
  );
};

export default CartScreen;
