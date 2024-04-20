import { useUploadDocumentImage } from "@/hooks/modal/tracking/useUploadDocumentImage";
import { X } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { Image } from "tamagui";

const UploadDocumentImage = () => {
  const { preview, pickImages, removeImages } = useUploadDocumentImage();

  return (
    <View className="relative">
      <Image
        source={{
          uri: preview ? preview : require("@/assets/images/post.png"),
          width: 80,
          height: 102,
        }}
        borderRadius={8}
        className="w-[50px] relative h-[150px] object-cover object-center"
        onPress={async () => {
          await pickImages([80, 102]);
        }}
      />
      {preview && (
        <View
          onTouchStart={() => {
            removeImages();
          }}
          className="-top-2 -right-2 bg-rose-500 absolute flex items-center justify-center p-[2px] rounded-full shadow-md"
        >
          <X size={24} color={"white"} />
        </View>
      )}
    </View>
  );
};

export default UploadDocumentImage;
