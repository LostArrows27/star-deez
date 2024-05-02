import { View } from "react-native";
import { Image } from "expo-image";
import { useAuth } from "@/hooks/auth/useAuth";
import { Avatar } from "tamagui";
import { Camera, RotateCcw } from "@tamagui/lucide-icons";
import {
  useUploadAvatar,
  useUploadCover,
} from "@/hooks/home/edit-profile/useUploadProfileImage";

const EditImage = () => {
  const { userDetails } = useAuth();

  const {
    preview: previewAvatar,
    pickImages: pickAvatar,
    removeImages: removeAvatar,
  } = useUploadAvatar();

  const {
    preview: previewCover,
    pickImages: pickCover,
    removeImages: removeCover,
  } = useUploadCover();

  return (
    <View className=" relative mb-4 h-[180px]">
      <Image
        style={{
          width: "100%",
          height: 120,
        }}
        contentFit="cover"
        contentPosition={"bottom"}
        source={
          previewCover
            ? previewCover
            : userDetails?.cover || require("@/assets/images/profile/cover.jpg")
        }
      />
      <View className="absolute h-[120px] top-0 bg-black/40 z-[4] w-full"></View>
      <Avatar
        pressStyle={{
          bg: "$green8Light",
        }}
        onPress={async () => {
          await pickCover([200, 120]);
        }}
        pos={"absolute"}
        width={100}
        height={100}
        bottom={"$11"}
        zIndex={9999999999999999999}
        right={"$2"}
        borderWidth={1.5}
        borderColor={"black"}
        size={"$3"}
        elevation={"$4"}
        borderRadius={99999999}
        justifyContent="center"
        bg="$green9Light"
        alignItems="center"
      >
        <Camera color="white" size={"$1"} />
      </Avatar>
      <Avatar
        pressStyle={{
          bg: "$blue8Light",
        }}
        onPress={async () => {
          removeCover();
          removeAvatar();
        }}
        pos={"absolute"}
        width={100}
        height={100}
        bottom={"$14"}
        mb={6}
        zIndex={9999999999999999999}
        right={"$2"}
        borderWidth={1.5}
        borderColor={"black"}
        size={"$3"}
        elevation={"$4"}
        borderRadius={99999999}
        justifyContent="center"
        bg="$blue9Light"
        alignItems="center"
      >
        <RotateCcw color="white" size={"$1"} />
      </Avatar>
      <View className="absolute center w-full top-[80px] z-50">
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 99999999,
              borderColor:
                userDetails?.gender === "female" ? "#ec4899" : "#3b82f6",
              borderWidth: 3,
            }}
            contentFit="cover"
            source={previewAvatar ? previewAvatar : userDetails?.avatar}
          />
          <Avatar
            pressStyle={{
              bg: "$green8Light",
            }}
            onPress={async () => {
              await pickAvatar([80, 80]);
            }}
            borderWidth={1.5}
            borderColor={"black"}
            pos={"absolute"}
            width={100}
            height={100}
            bottom={2}
            zIndex={999999999}
            right={"$-2"}
            size={"$3"}
            elevation={"$6"}
            borderRadius={99999999}
            justifyContent="center"
            bg="$green9Light"
            alignItems="center"
          >
            <Camera color="white" size={"$1"} />
          </Avatar>
        </View>
      </View>
    </View>
  );
};

export default EditImage;
