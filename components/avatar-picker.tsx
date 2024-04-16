import { View, Text } from "react-native";
import React, { useState } from "react";
import { Circle, Image } from "tamagui";
import * as ImagePicker from "expo-image-picker";
import { Plus } from "@tamagui/lucide-icons";
import { decode } from "base64-arraybuffer";
// import DocumentPicker from "react-native-document-picker";
// import RNFS from "react-native-fs";
export default function AvatarPicker({
  setImage,
}: {
  setImage: (image: ImagePicker.ImagePickerResult | null) => void;
}) {
  const [preView, setPreView] = useState<string | null>(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
     
      setPreView(result.assets[0].uri);
      setImage(result);
    }
  };
  return (
    <View className="w-full items-center !mb-5">
      <Text></Text>
      <Circle
        size={100}
        backgroundColor={"#fff"}
        borderWidth={"$1"}
        borderColor={"$color8"}
        elevation="$4"
        overflow="hidden"
        onPress={pickImage}
      >
        {preView ? (
          <Image source={{ uri: preView }} width={"100%"} height={"100%"} />
        ) : (
          <Plus size={"$3"} color={"$color8"} />
        )}
      </Circle>
    </View>
  );
}
