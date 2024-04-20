import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Clock } from "@tamagui/lucide-icons";
import { Input, XStack } from "tamagui";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import convertMinute from "@/utils/convert-minute";
import { useCreateStudyRecord } from "@/hooks/modal/tracking/useCreateStudyRecord";

export default function StudyDurationPicker() {
  const [showPicker, setShowPicker] = useState(false);
  const { duration, setDuration } = useCreateStudyRecord();
  return (
    <Pressable onPress={() => setShowPicker(true)}>
      <XStack alignItems={"center"} justifyContent="flex-start" gap={"$2"}>
        <Clock size={"$2"} color={"$color8"} />
        <Input pointerEvents="none" editable={false} flexGrow={1}>
          {duration !== 0 ? convertMinute(duration) : "Learning Duration"}
        </Input>
      </XStack>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        hideSeconds
        onConfirm={(pickedDuration) => {
          console.log(pickedDuration);
          //   setAlarmString(formatTime(pickedDuration));
          const durationTMP =
            pickedDuration.hours * 60 + pickedDuration.minutes;
          setDuration(durationTMP);
          setShowPicker(false);
        }}
        modalTitle="Learning Duration"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        LinearGradient={LinearGradient}
        styles={{
          theme: "light",
          confirmButton: {
            borderColor: "hsl(151, 49.3%, 46.5%)",
            backgroundColor: "hsl(151, 49.3%, 46.5%)",
            color: "#fff",
          },
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </Pressable>
  );
}
