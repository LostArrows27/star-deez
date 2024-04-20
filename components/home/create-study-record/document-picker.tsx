import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { Adapt, Button, Dialog, Image, Sheet } from "tamagui";

import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";
import DocumentSubList from "../tracking/document-sub-list";

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
        <View
          onTouchStart={() => {
            setOpen(true);
          }}
          className="flex-row gap-x-4 items-center w-full"
        >
          <Image
            source={{
              uri:
                selectedDocument?.cover || require("@/assets/images/post.png"),
              width: 40,
              height: 50,
            }}
            borderRadius={8}
            marginRight={16}
            className="w-[40px]  relative h-[50px] object-cover object-center"
          />
          <Text className="text-xl font-semibold">
            {selectedDocument ? selectedDocument.title : "Choose a document"}
          </Text>
        </View>
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
                <DocumentSubList
                  color={colors[index]}
                  key={item.id}
                  data={item}
                  selectable
                  onCloseSelections={() => {
                    setOpen(false);
                  }}
                />
              );
            })}
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
