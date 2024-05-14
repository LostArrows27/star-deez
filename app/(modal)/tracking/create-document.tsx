import PickCategory from "@/components/home/create-document/pick-category";
import PickStatus from "@/components/home/create-document/pick-status";
import PickUnit from "@/components/home/create-document/pick-unit";
import UploadDocumentImage from "@/components/home/create-document/upload-document-image";
import ModalWrapper from "@/components/modal/modal-wrapper";
import { useAuth } from "@/hooks/auth/useAuth";
import { useCreateDocument } from "@/hooks/modal/tracking/useCreateDocument";

import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, Input, TextArea } from "tamagui";
import { toSlug } from "@/utils/convert-to-slug";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import { useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import uuid from "react-uuid";
import { ActivityIndicator } from "react-native";
import { useUploadDocumentImage } from "@/hooks/modal/tracking/useUploadDocumentImage";

const CartScreen = () => {
  const {
    unit,
    category,
    status,
    title,
    description,
    setDescription,
    setTitle,
    reset,
    editDocumentID,
  } = useCreateDocument();

  const [loading, setLoading] = useState(false);

  const { userDetails } = useAuth();

  const { image, preview, removeImages } = useUploadDocumentImage();

  const toast = useToastController();

  const canSubmit =
    title &&
    description &&
    unit &&
    unit.id &&
    category &&
    category.id &&
    status;

  useEffect(() => {
    return () => {
      reset();
      removeImages();
    };
  }, []);

  const handleCreateDocument = async () => {
    if (loading || !canSubmit || !userDetails) return;

    setLoading(true);
    const id = editDocumentID ? editDocumentID : uuid();
    const fileName = `${userDetails?.id}/${id}/${toSlug(title)}`;

    let url: any = preview && !image ? preview : undefined;

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

    const { data, error } = await supabase.from("document").upsert(
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
      { onConflict: "id" }
    );

    if (error) {
      console.log("error", error);
      toast.show(
        `Error ${editDocumentID ? "updating" : "creating"} document. `,
        { preset: "error" }
      );
    } else {
      reset();
      removeImages();
      toast.show("Success!!", {
        message: `Document ${
          editDocumentID ? "updated" : "created"
        } successfully!`,
        native: false,
      });
      router.replace("/tracking/");
    }
  };

  return (
    <ModalWrapper
      className=" justify-between flex-1 p-4 px-6 pt-12 bg-white"
      options={{
        headerShown: true,
        headerTitle: "Upload your document",
        animation: "slide_from_bottom",
      }}
    >
      <View>
        <View className="center gap-y-10 w-full">
          <UploadDocumentImage />
          <Input
            onChangeText={setTitle}
            value={title}
            height={"$5"}
            fontSize={"$5"}
            placeholder="Document title..."
            width={"100%"}
            mb={-10}
            fontWeight={"$15"}
          />
          <TextArea
            onChangeText={setDescription}
            value={description}
            height={"$10"}
            textAlignVertical="top"
            fontSize={"$5"}
            placeholder="Document description..."
            width={"100%"}
          />
        </View>
        <View className="gap-4 mt-6">
          <PickStatus />
          <PickUnit />
          <PickCategory />
        </View>
      </View>
      <Button
        mb={20}
        iconAfter={
          loading ? <ActivityIndicator size="small" color="#fff" /> : undefined
        }
        onPress={handleCreateDocument}
        pressStyle={{
          backgroundColor: canSubmit ? "$green8Light" : "$gray10Dark",
        }}
        color={"white"}
        themeInverse
        disabled={!canSubmit}
        backgroundColor={canSubmit ? "$green9Light" : "$gray10Dark"}
      >
        {editDocumentID ? "Update Document" : "Create Document"}
      </Button>
    </ModalWrapper>
  );
};

export default CartScreen;
