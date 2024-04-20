import { DocumentFull } from "@/types/supabase-util-types";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { Image } from "tamagui";

const DocumentItem = ({ document }: { document: DocumentFull }) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#d7d7d7", false)}
    >
      <View className="w-[100px] pb-1 bg-emerald-500 mr-6 h-[145px] overflow-hidden rounded-lg ">
        <Image
          source={{
            uri: document.cover || require("@/assets/images/post.png"),
            width: 50,
            height: 50,
          }}
          resizeMode="cover"
          width={"100%"}
          pt={"90%"}
        />
        <View className="center flex-1 px-3">
          <Text
            numberOfLines={2}
            className=" mt-2 text-sm font-bold text-center text-white"
          >
            {document.title}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default DocumentItem;
