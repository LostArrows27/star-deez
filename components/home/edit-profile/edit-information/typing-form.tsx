import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { H5, Input, TextArea } from "tamagui";

type TypingFormProps = {
  defaultValue?: string;
  placeholder: string;
  setValue: (value: string) => void;
  title: string;
  type?: "input" | "textarea";
};

const TypingForm = ({
  defaultValue = "",
  placeholder,
  setValue,
  title,
  type = "input",
}: TypingFormProps) => {
  const [text, setText] = useState(defaultValue);

  return (
    <View className="flex-1 gap-3">
      <Text>{title}</Text>
      {type === "input" ? (
        <Input
          bg={"$colorTransparent"}
          focusStyle={{
            borderColor: "$color10",
          }}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={text}
          onChangeText={(text) => {
            setText(text);
            setValue(text);
          }}
          numberOfLines={1}
          placeholderTextColor={"$color7"}
        />
      ) : (
        <TextArea
          size={"$4"}
          bg={"$colorTransparent"}
          focusStyle={{
            borderColor: "$color9",
          }}
          textAlignVertical="top"
          placeholderTextColor={"$color7"}
          numberOfLines={5}
          height={100}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={text}
          onChangeText={(text) => {
            setText(text);
            setValue(text);
          }}
        />
      )}
    </View>
  );
};

export default TypingForm;
