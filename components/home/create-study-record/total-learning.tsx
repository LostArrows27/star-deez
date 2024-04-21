import { View, Text } from "react-native";
import React from "react";
import { Input, Theme } from "tamagui";
import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";

export default function TotalLearning({
  currentLearning,
  setCurrentLearning,
}: {
  currentLearning: { from: number; to: number };
  setCurrentLearning: (value: any) => void;
}) {
  const { selectedDocument } = useCategorizedDocuments();
  return (
    <>
      <View className="items-center  justify-center py-20 w-full">
        <View className="relative w-fit h-fit gap-y-2 center">
          <Text className="text-emerald-500">Total</Text>

          <Theme name={"active"}>
            <Input
              keyboardType="numeric"
              height={"$7"}
              minWidth={"$6"}
              fontSize={"$8"}
              onChangeText={(text) => {
                if (!text) return;
                const newLerning = {
                  ...currentLearning,
                  to: Number(text),
                };
                setCurrentLearning(newLerning);
              }}
              value={"" + currentLearning.to}
            />
          </Theme>
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
    </>
  );
}
