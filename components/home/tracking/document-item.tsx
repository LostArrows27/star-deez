import { useCreateDocument } from "@/hooks/modal/tracking/useCreateDocument";
import { useUploadDocumentImage } from "@/hooks/modal/tracking/useUploadDocumentImage";
import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";
import { supabase } from "@/lib/supabase";
import { DocumentFull } from "@/types/supabase-util-types";
import { BookUser, Edit3, Trash2 } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableNativeFeedback, ScrollView } from "react-native";
import { Adapt, Button, H3, Image, Popover, Separator } from "tamagui";

const DocumentItem = ({
  document,
  selectable = false,
  onCloseSelections,
}: {
  document: DocumentFull;
  selectable?: boolean;
  onCloseSelections?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const { setSelectedDocument, categorizedDocument, setCategorizeDocument } =
    useCategorizedDocuments();
  const {
    setDescription,
    setTitle,
    setStatus,
    setUnit,
    setCategory,
    setEditDocumentID,
  } = useCreateDocument();
  const toast = useToastController();

  const { setPreview } = useUploadDocumentImage();
  const handleEdit = () => {
    setOpen(false);
    router.push("/(modal)/tracking/create-document");
    setEditDocumentID(document.id);
    setTitle(document.title);
    setStatus(document.status);
    setDescription(document.description);
    setUnit(document.unit);
    setCategory(document.category);
    setPreview(document.cover);
  };

  const handleDelete = async () => {
    setOpen(false);
    const newCategorizedDocument = categorizedDocument.map((item) => {
      item.documents = item.documents.filter((doc) => doc.id !== document.id);
      return item;
    });

    setCategorizeDocument(newCategorizedDocument);
    const { data, error } = await supabase
      .from("document")
      .delete()
      .eq("id", document.id);
    if (error) {
      console.error(error);
    }

    toast.show("Success!!", {
      message: `Deleted successfully`,
      native: false,
    });
    setSelectedDocument(null);
  };
  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <TouchableNativeFeedback
        // onLongPress={() => {
        //   setOpen(true);
        // }}
        onPress={() => {
          if (selectable && onCloseSelections) {
            setSelectedDocument(document);
            onCloseSelections();
          } else {
            setOpen(true);
          }
        }}
        background={TouchableNativeFeedback.Ripple("#d7d7d7", false)}
        className="w-[100px] pb-1 bg-emerald-500 mr-6 h-[145px] overflow-hidden rounded-lg "
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

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "lazy",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        height={100}
      >
        <Popover.ScrollView
          style={{
            gap: 0,
          }}
          showsVerticalScrollIndicator={false}
        >
          <H3 textAlign="center" numberOfLines={2} p={0}>
            {document.title}
          </H3>
          <Text className="my-4 mt-6" numberOfLines={6}>
            {document.description}
          </Text>
          <View className="flex-row w-full gap-4 mt-4">
            <Button
              themeInverse
              pressStyle={{
                backgroundColor: "$green8Dark",
              }}
              backgroundColor={"$green10Dark"}
            >
              <Text className="text-white" numberOfLines={1}>
                {document.category.name}
              </Text>
            </Button>
            <Button
              themeInverse
              pressStyle={{
                backgroundColor: "$green8Dark",
              }}
              backgroundColor={"$green10Dark"}
            >
              <Text className="text-white" numberOfLines={1}>
                {document.status}
              </Text>
            </Button>
            <Button
              themeInverse
              pressStyle={{
                backgroundColor: "$green8Dark",
              }}
              backgroundColor={"$green10Dark"}
            >
              <Text className="text-white" numberOfLines={1}>
                {document.unit.name}
              </Text>
            </Button>
          </View>
          <Separator mt={30} mb={20} />
          <View className="gap-4">
            <Button
              scaleIcon={2}
              px={10}
              height={"$5"}
              fontSize={"$4"}
              justifyContent="flex-start"
              icon={<Edit3 color={"green"} />}
              chromeless
              onPress={handleEdit}
            >
              Edit
            </Button>

            <Button
              scaleIcon={2}
              px={10}
              height={"$5"}
              onPress={() => {
                router.push("/(modal)/tracking/create-study-record");
                setSelectedDocument(document);
                setOpen(false);
              }}
              fontSize={"$4"}
              justifyContent="flex-start"
              icon={<BookUser color={"blue"} />}
              chromeless
            >
              Create study record
            </Button>
            <Button
              scaleIcon={2}
              px={10}
              height={"$5"}
              fontSize={"$4"}
              justifyContent="flex-start"
              icon={<Trash2 color={"red"} />}
              chromeless
              onPress={handleDelete}
            >
              Delete
            </Button>
          </View>
        </Popover.ScrollView>
      </Popover.Content>
    </Popover>
  );
};

export default DocumentItem;
