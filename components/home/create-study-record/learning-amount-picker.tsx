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
import TotalLearning from "./total-learning";
import RangeLearning from "./range-learning";

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
      open={(selectedDocument ? true : false) && open}
      onOpenChange={(open) => {
        if (!selectedDocument) {
          setOpen(false);
          toast.show("Please select a document", { preset: "error" });
        } else {
          setOpen(open);
        }
      }}
    >
      <Dialog.Trigger>
        <XStack alignItems={"center"} justifyContent="flex-start" gap={"$2"}>
          <GraduationCap size={"$2"} color={"$color8"} />
          <Input pointerEvents="none" editable={false} flexGrow={1}>
            {learning.to !== 0
              ? learning.from !== 0
                ? `${learning.from} ~ ${learning.to} ${selectedDocument?.unit.name}`
                : `${learning.to}  ${selectedDocument?.unit.name}`
              : "Learning progress"}
          </Input>
        </XStack>
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
                <Text>Total</Text>
              </Tabs.Tab>
              <Tabs.Tab flex={1} value="tab2">
                <Text>Range</Text>
              </Tabs.Tab>
            </Tabs.List>
            <Separator />
            <Tabs.Content
              borderWidth={"$1.5"}
              borderColor={"$color4"}
              value="tab1"
            >
              <TotalLearning
                currentLearning={currentLearning}
                setCurrentLearning={setCurrentLearning}
              />
            </Tabs.Content>

            <Tabs.Content
              borderWidth={"$1.5"}
              borderColor={"$color4"}
              value="tab2"
            >
              <RangeLearning
                currentLearning={currentLearning}
                setCurrentLearning={setCurrentLearning}
              />
            </Tabs.Content>
          </Tabs>
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                onPress={() => {
                  if (currentLearning.from > currentLearning.to) {
                    toast.show("From should be less than to", {
                      preset: "error",
                    });
                    return;
                  }
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
