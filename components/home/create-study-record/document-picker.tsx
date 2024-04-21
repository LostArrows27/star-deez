import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { Adapt, Button, Dialog, Image, Sheet } from "tamagui";

import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";
import DocumentSubList from "../tracking/document-sub-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DocumentItem from "../tracking/document-item";

export default function DocumentPicker() {
  const [open, setOpen] = useState(false);
  const { categorizedDocument, selectedDocument, colors, setSelectedDocument } =
    useCategorizedDocuments();  
  
  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button
          alignItems="center"
          width={"100%"}
          columnGap={4}
          px={0}
          justifyContent="flex-start"
        >
          <Image
            source={{
              uri:
                selectedDocument?.cover || require("@/assets/images/post.png"),
              width: 40,
              height: 50,
            }}
            borderRadius={8}
            className="w-[40px]  relative h-[50px] object-cover object-center"
          />
          <Text className="text-xl font-semibold">
            {selectedDocument ? selectedDocument.title : "Choose a document"}
          </Text>
        </Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content key="content">
          <Dialog.Title fontSize={"$8"}>Select a document</Dialog.Title>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="gap-y-5 flex-col relative  "
          >
            <Text
              onPress={() => {
                setSelectedDocument(null);
                setOpen(false);
              }}
              className="capitalize my-4 text-emerald-500 text-center font-semibold text-xl"
            >
              WITHOUT TEXTBOOK
            </Text>
            {categorizedDocument.map((item, index) => {
              if (!item.documents || item.documents.length === 0) return;
              return (
                <View className="gap-5 mb-4" key={index}>
                  <View className="flex-row items-center gap-3">
                    <MaterialCommunityIcons
                      name="bookmark-multiple"
                      size={24}
                      color={colors[index]}
                    />
                    <Text className=" text-2xl font-semibold">{item.name}</Text>
                  </View>
                  <FlatList
                    horizontal
                    scrollEnabled={item.documents.length > 2}
                    data={item.documents}
                    renderItem={(data) => (
                      <DocumentItem
                        document={data.item}
                        selectable
                        onCloseSelections={() => {
                          setOpen(false);
                        }}
                      />
                    )}
                  />
                </View>
              );
            })}
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}