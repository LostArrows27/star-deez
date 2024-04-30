import ModalWrapper from "@/components/modal/modal-wrapper";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import {
  Button,
  Image,
  Label,
  Separator,
  SizeTokens,
  Switch,
  TextArea,
  View as ViewTama,
  XStack,
} from "tamagui";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import { useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import uuid from "react-uuid";
import { Calendar, Camera, Clock, X } from "@tamagui/lucide-icons";
import { useUploadStudyRecordImage } from "@/hooks/modal/tracking/useUploadStudyRecordImage";

import StudyDurationPicker from "@/components/home/create-study-record/duration-picker";
import StudyTimePicker from "@/components/home/create-study-record/study-time-picker";
import DocumentPicker from "@/components/home/create-study-record/document-picker";
import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";
import { useCreateStudyRecord } from "@/hooks/modal/tracking/useCreateStudyRecord";
import LearningAmountPicker from "@/components/home/create-study-record/learning-amount-picker";
import combineTime from "@/utils/combine-time";

const CreateStudyRecord = () => {
  const [loading, setLoading] = useState(false);

  const { userDetails } = useAuth();
  const {
    date,
    setDate,
    time,
    setTime,
    duration,
    setDuration,
    comment,
    learning,
    setLearning,
    setComment,
    reset,
  } = useCreateStudyRecord();

  const { image, preview, removeImages, pickImages } =
    useUploadStudyRecordImage();
  const { selectedDocument, setSelectedDocument } = useCategorizedDocuments();
  const toast = useToastController();
  const [publicS, setPublic] = useState(true);
  const canSubmit =
    date && time && learning.to !== 0 && duration && selectedDocument;

  const handleCreateStudyRecord = async () => {
    if (loading || !canSubmit || !userDetails) return;
    setLoading(true);
    const id = uuid();
    const fileName = `${userDetails?.id}/${id}/image`;
    let url: any = undefined;
    if (image && !image?.canceled) {
      const { data, error } = await supabase.storage
        .from("study_record")
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
        } = supabase.storage.from("study_record").getPublicUrl(data.path);
        url = publicUrl;
      }
    }

    const { data, error } = await supabase.from("study_records").insert([
      {
        id,
        document_id: selectedDocument.id,
        comment,
        duration,
        image: url,
        time: combineTime(date!, time!).toISOString(),
        user_id: userDetails?.id,
        begin_at: learning.from,
        end_at: learning.to,
        visibility: publicS ? "public" : "private",
      },
    ]);
    if (error) {
      console.log("error", error);
      toast.show("Error creating study record. ", { preset: "error" });
    } else {
      reset();
      removeImages();
      setSelectedDocument(null);
      toast.show("Success!!", {
        message: "Study recorded successfully!",
        native: false,
      });
      router.replace("/tracking/");
    }
  };

  return (
    <ModalWrapper
      className="flex-1 p-4 px-6 bg-white"
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
            onPress={handleCreateStudyRecord}
            pressStyle={{
              backgroundColor: canSubmit ? "$green8Light" : "$gray10Dark",
            }}
            iconAfter={
              loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : undefined
            }
            color={"white"}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="mb-2 text-xl font-semibold">Detail</Text>
        <ViewTama
          width={"100%"}
          backgroundColor={"$color4"}
          rowGap="$2"
          padding="$4"
        >
          <DocumentPicker />
          <Separator marginVertical={6} borderColor={"$color8"} />
          <StudyTimePicker />
          <StudyDurationPicker />
          <LearningAmountPicker />
          <SwitchWithLabel size="$2" checked={publicS} setChecked={setPublic} />
        </ViewTama>
        <Text className="my-2 text-xl font-semibold">Comment</Text>
        <ViewTama
          width={"100%"}
          backgroundColor={"$color4"}
          gap="$2"
          padding="$4"
        >
          <TextArea
            onChangeText={setComment}
            value={comment}
            height={"$10"}
            fontSize={"$5"}
            placeholderTextColor={"$gray8"}
            textAlignVertical="top"
            placeholder="Comment..."
            width={"100%"}
          />
          <Separator backgroundColor={"$color8"} />
          <ViewTama
            aspectRatio={12 / 9}
            width={"100%"}
            justifyContent="center"
            alignItems="center"
            borderWidth="$1"
            borderColor={"$color8"}
            borderStyle="dashed"
            onPress={async () => {
              await pickImages([12, 9]);
            }}
          >
            {preview ? (
              <>
                <Image
                  source={{
                    uri: preview,
                    width: 120,
                    height: 90,
                  }}
                  borderRadius={8}
                  width="100%"
                  height="100%"
                  className=" object-cover object-center"
                  onPress={async () => {
                    await pickImages([12, 9]);
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
                <Text className=" font-semibold">Select an Image</Text>
              </>
            )}
          </ViewTama>
        </ViewTama>
      </ScrollView>
      {/* <View className="gap-4 mt-6">
        <PickStatus />
        <PickUnit />
        <PickCategory />
      </View> */}
    </ModalWrapper>
  );
};

export default CreateStudyRecord;

export function SwitchWithLabel(props: {
  size: SizeTokens;
  checked: boolean;
  setChecked: (value: boolean) => void;
  defaultChecked?: boolean;
}) {
  const id = `switch-${props.size.toString().slice(1)}-${
    props.defaultChecked ?? ""
  }}`;

  return (
    <XStack alignItems="center" justifyContent="flex-end" gap="$2">
      <Label
        paddingRight="$0"
        fontSize={"$8"}
        fontWeight={"700"}
        justifyContent="flex-end"
        size={props.size}
        htmlFor={id}
      >
        Visibility:
        <Text className="text-emerald-500">
          {" "}
          {props.checked ? "Public" : "Private"}
        </Text>
      </Label>

      <Switch
        id={id}
        size={props.size}
        checked={props.checked}
        onCheckedChange={() => {
          props.setChecked(!props.checked);
        }}
      >
        <Switch.Thumb animation="quicker" />
      </Switch>
    </XStack>
  );
}
