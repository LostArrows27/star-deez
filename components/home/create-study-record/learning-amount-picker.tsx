import { View, Text } from "react-native";
import React, { useState } from "react";

import {
  Adapt,
  Button,
  Dialog,
  H5,
  Image,
  Input,
  Separator,
  Sheet,
  SizableText,
  Tabs,
  Unspaced,
  XStack,
} from "tamagui";
import { useCreateStudyRecord } from "@/hooks/modal/tracking/useCreateStudyRecord";
import { ClipboardCopy, GraduationCap } from "@tamagui/lucide-icons";
import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";
import { useToastController } from "@tamagui/toast";

export default function LearningAmountPicker() {
  const [open, setOpen] = useState(false);
  const [currentLearning, setCurrentLearning] = useState({
    from: 0,
    to: 0,
  });
  const { learning, setLearning } = useCreateStudyRecord();
  const { selectedDocument } = useCategorizedDocuments();
  const toast = useToastController();
  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <XStack
        onPress={() => {
          if (selectedDocument) {
            setOpen(true);
          } else {
            toast.show("Please select a document first", { preset: "error" });
          }
        }}
        alignItems={"center"}
        justifyContent="flex-start"
        gap={"$2"}
      >
        <GraduationCap size={"$2"} color={"$color8"} />
        <Input pointerEvents="none" editable={false} flexGrow={1}>
          {learning.to !== 0
            ? learning.from !== 0
              ? `${learning.from} ~ ${learning.to} ${selectedDocument?.unit.name}`
              : `${learning.to}  ${selectedDocument?.unit.name}`
            : "Learning progress"}
        </Input>
      </XStack>

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
          <Dialog.Title fontSize={"$8"}>Learning progress</Dialog.Title>
          <Tabs
            defaultValue="tab1"
            orientation="horizontal"
            flexDirection="column"
            width={"100%"}
            borderRadius="$4"
            borderWidth="$0.25"
            overflow="hidden"
            borderColor="$borderColor"
          >
            <Tabs.List
              disablePassBorderRadius="bottom"
              aria-label="Manage your account"
            >
              <Tabs.Tab flex={1} value="tab1">
                <SizableText fontFamily="$body">Total</SizableText>
              </Tabs.Tab>
              <Tabs.Tab flex={1} value="tab2">
                <SizableText fontFamily="$body">Range</SizableText>
              </Tabs.Tab>
            </Tabs.List>
            <Separator />
            <Tabs.Content
              borderWidth={"$1.5"}
              borderColor={"$color4"}
              value="tab1"
            >
              <View className="items-center  justify-center py-20 w-full">
                <View className="relative w-fit h-fit gap-y-2 center">
                  <Text className="text-emerald-500">Total</Text>

                  <Input
                    keyboardType="numeric"
                    height={"$7"}
                    minWidth={"$6"}
                    fontSize={"$8"}
                    onChangeText={(text) => {
                      const newLerning = {
                        ...currentLearning,
                        to: Number(text),
                      };
                      setCurrentLearning(newLerning);
                    }}
                  >
                    {currentLearning.to}
                  </Input>
                </View>
              </View>
              <View className="absolute bottom-10 right-10">
                <Text>
                  {"Unit: "}{" "}
                  <Text className="text-emerald-500 font-semibold">
                    {selectedDocument?.unit.name}
                  </Text>
                </Text>
              </View>
            </Tabs.Content>

            <Tabs.Content
              borderWidth={"$1.5"}
              borderColor={"$color4"}
              value="tab2"
            >
              <View className="items-center flex-row  justify-center py-20 w-full">
                <View className="relative w-fit h-fit gap-y-2 center">
                  <Text className="text-emerald-500">From</Text>

                  <Input
                    keyboardType="numeric"
                    height={"$7"}
                    minWidth={"$6"}
                    fontSize={"$8"}
                    onChangeText={(text) => {
                      const newLerning = {
                        ...currentLearning,
                        from: Number(text),
                      };
                      setCurrentLearning(newLerning);
                    }}
                  >
                    {currentLearning.from}
                  </Input>
                </View>
                <Separator
                  vertical
                  marginHorizontal={20}
                  h={"100%"}
                  w={"100%"}
                  borderColor={"$color8"}
                />
                <View className="relative w-fit h-fit gap-y-2 center">
                  <Text className="text-emerald-500">To</Text>

                  <Input
                    keyboardType="numeric"
                    height={"$7"}
                    minWidth={"$6"}
                    fontSize={"$8"}
                    onChangeText={(text) => {
                      const newLerning = {
                        ...currentLearning,
                        to: Number(text),
                      };
                      setCurrentLearning(newLerning);
                    }}
                  >
                    {currentLearning.to}
                  </Input>
                </View>
              </View>
              <View className="absolute bottom-10 right-10">
                <Text>
                  {"Unit: "}{" "}
                  <Text className="text-emerald-500 font-semibold">
                    {selectedDocument?.unit.name}
                  </Text>
                </Text>
              </View>
            </Tabs.Content>
          </Tabs>
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                onPress={() => {
                  setLearning(currentLearning);
                  setOpen(false);
                }}
                theme="active"
                aria-label="Close"
              >
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
