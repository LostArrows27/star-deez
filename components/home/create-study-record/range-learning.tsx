import { View, Text } from "react-native";
import React from "react";
import { Input, Separator, Theme } from "tamagui";
import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";
import { useToastController } from "@tamagui/toast";

export default function RangeLearning({
  currentLearning,
  setCurrentLearning,
}: {
  currentLearning: { from: number; to: number };
  setCurrentLearning: (value: any) => void;
}) {
  const { selectedDocument } = useCategorizedDocuments();

  return (
    <>
      <View className="items-center flex-row  justify-center py-20 w-full">
        <View className="relative w-fit h-fit gap-y-2 center">
          <Text className="text-emerald-500">From</Text>

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
                  from: Number(text),
                };
                setCurrentLearning(newLerning);
              }}
              value={"" + currentLearning.from}
            />
          </Theme>
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
