import StyledPressable from "@/components/styled-pressable";
import { router } from "expo-router";
import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  Part,
  PartType,
  parseValue,
  isMentionPartType,
} from "react-native-controlled-mentions";

const renderPart = (part: Part, index: number) => {
  // Just plain text
  if (!part.partType) {
    return <Text key={index}>{part.text}</Text>;
  }

  // Mention type part
  if (isMentionPartType(part.partType)) {
    return (
      <Text
        key={`${index}-${part.data?.trigger}`}
        style={part.partType.textStyle}
        onPress={() => {
          router.push(`/profile/${part.data?.id}`);
        }}
        className="focus:opacity-60 hover:opacity-60"
      >
        {part.text}
      </Text>
    );
  }

  // Other styled part types
  return (
    <Text key={`${index}-pattern`} style={part.partType.textStyle}>
      {part.text}
    </Text>
  );
};

/**
 * Value renderer. Parsing value to parts array and then mapping the array using 'renderPart'
 *
 * @param value - value from MentionInput
 * @param partTypes - the part types array that you providing to MentionInput
 */
const renderValue = (value: string, partTypes: PartType[]) => {
  const { parts } = parseValue(value, partTypes);

  return <>{parts.map(renderPart)}</>;
};

export default renderValue;
