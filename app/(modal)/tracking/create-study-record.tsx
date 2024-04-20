import ModalWrapper from "@/components/modal/modal-wrapper";
import { useAuth } from "@/hooks/auth/useAuth";
import { useCreateDocument } from "@/hooks/modal/tracking/useCreateDocument";
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Image, Separator, TextArea, View as ViewTama } from "tamagui";
import { toSlug } from "@/utils/convert-to-slug";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import { useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import uuid from "react-uuid";
import { Calendar, Camera, Clock, X } from "@tamagui/lucide-icons";
import { useUploadStudyRecordImage } from "@/hooks/modal/tracking/useUploadStudyRecordImage";

import StudyDurationPicker from "@/components/home/tracking/create-study-record/duration-picker";
import StudyTimePicker from "@/components/home/tracking/create-study-record/study-time-picker";
const CreateStudyRecord = () => {
  const {
    unit,
    category,
    status,
    title,
    description,
    setDescription,
    setTitle,
    reset,
  } = useCreateDocument();

  const [loading, setLoading] = useState(false);

  const { userDetails } = useAuth();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [comment, setComment] = useState("");
  const [learning, setLearning] = useState({
    from: 0,
    to: 0,
  });
  const [duration, setDuration] = useState(0); // minutes
  const { image, preview, removeImages, pickImages } =
    useUploadStudyRecordImage();

  const toast = useToastController();

  const canSubmit =
    title &&
    description &&
    unit &&
    unit.id &&
    category &&
    category.id &&
    status;

  const handleCreateDocument = async () => {
    if (loading || !canSubmit || !userDetails) return;

    setLoading(true);
    const id = uuid();
    const fileName = `${userDetails?.id}/${id}/${toSlug(title)}`;

    let url: any = undefined;

    if (image && !image?.canceled) {
      const { data, error } = await supabase.storage
        .from("document")
        .upload(
          fileName,
          decode(image.assets[0].base64 || image.assets[0].uri),
          {
            contentType: `image/png`,
          }
        );

      if (error || !data) {
        console.log("error", error);
      } else {
        const {
          data: { publicUrl },
        } = supabase.storage.from("document").getPublicUrl(data.path);

        url = publicUrl;
      }
    }

    const { data, error } = await supabase.from("document").insert([
      {
        id,
        title,
        description,
        status,
        unit_id: unit.id,
        category_id: category.id,
        user_id: userDetails?.id,
        cover: url,
      },
    ]);

    if (error) {
      console.log("error", error);
      toast.show("Error creating document. ", { preset: "error" });
    } else {
      reset();
      removeImages();
      toast.show("Success!!", {
        message: "Document created successfully!",
        native: false,
      });
      router.replace("/tracking/");
    }
  };

  return (
    <ModalWrapper
      className="flex-1 p-4 px-6  bg-white"
      options={{
        headerShown: true,
        headerTitle: "Create Study Record",
        animation: "slide_from_bottom",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        headerRight: () => (
          <Button
            onPress={handleCreateDocument}
            pressStyle={{
              backgroundColor: canSubmit ? "$green8Light" : "$gray10Dark",
            }}
            themeInverse
            fontSize={"$5"}
            padding={"$2 $2"}
            disabled={!canSubmit}
            backgroundColor={canSubmit ? "$green9Light" : "$gray10Dark"}
          >
            Post
          </Button>
        ),
      }}
    >
      <Text className="text-xl font-semibold mb-2">Detail</Text>
      <ViewTama
        width={"100%"}
        backgroundColor={"$color4"}
        rowGap="$2"
        padding="$4"
      >
        <Separator backgroundColor={"$color8"} />
        <StudyTimePicker
          date={date}
          time={time}
          setDate={setDate}
          setTime={setTime}
        />
        <StudyDurationPicker duration={duration} setDuration={setDuration} />
        <View></View>
      </ViewTama>
      <Text className="text-xl font-semibold my-2">Comment</Text>
      <ViewTama
        width={"100%"}
        backgroundColor={"$color4"}
        gap="$2"
        padding="$4"
      >
        <TextArea
          onChangeText={setDescription}
          value={description}
          height={"$10"}
          fontSize={"$5"}
          placeholderTextColor={"$gray8"}
          textAlignVertical="top"
          placeholder="Comment..."
          width={"100%"}
        />
        <Separator backgroundColor={"$color8"} />
        <ViewTama
          aspectRatio={16 / 9}
          width={"100%"}
          justifyContent="center"
          alignItems="center"
          borderWidth="$1"
          borderColor={"$color8"}
          borderStyle="dashed"
          onPress={async () => {
            await pickImages([16, 9]);
          }}
        >
          {preview ? (
            <>
              <Image
                source={{
                  uri: preview,
                  width: 160,
                  height: 90,
                }}
                borderRadius={8}
                width="100%"
                height="100%"
                className=" object-cover object-center"
                onPress={async () => {
                  await pickImages([16, 9]);
                }}
              />
              <View
                onTouchStart={() => {
                  removeImages();
                }}
                className="-top-2 -right-2 bg-rose-500 absolute flex items-center justify-center p-[2px] rounded-full shadow-md"
              >
                <X size={24} color={"white"} />
              </View>
            </>
          ) : (
            <>
              <Camera color={"$color8"} />
              <Text className=" font-semibold ">Select an Image</Text>
            </>
          )}
        </ViewTama>
      </ViewTama>
      {/* <View className="gap-4 mt-6">
        <PickStatus />
        <PickUnit />
        <PickCategory />
      </View> */}
    </ModalWrapper>
  );
};

export default CreateStudyRecord;
