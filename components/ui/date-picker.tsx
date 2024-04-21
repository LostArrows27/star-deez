import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // https://github.com/mmazzarolo/react-native-modal-datetime-picker
import { XStack, YStack, Input, Separator, Spacer, ZStack } from "tamagui";
import { Calendar, Clock, Component } from "@tamagui/lucide-icons";

interface datePickerProps {
  date?: Date;
  type: "date" | "time";
  confirmText?: string;
  cancelText?: string;
  accentColor?: string;
  textColor?: string;
  buttonTextColorIOS?: string;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
  children: React.ReactNode;
}

const DateTimePicker = function DatePicker(props: datePickerProps) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(props.date);

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    props.onConfirm && props.onConfirm(date);
    hideDatePicker();
  };

  const type = props.type || "date";

  return (
    <Pressable onPress={() => setShow(true)} className="flex-1">
      {props.children}

      <DateTimePickerModal
        cancelTextIOS={props.cancelText}
        confirmTextIOS={props.confirmText}
        date={date}
        isVisible={show}
        mode={type}
        accentColor={props.accentColor}
        textColor={props.textColor}
        buttonTextColorIOS={props.buttonTextColorIOS}
        onChange={props.onChange}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
};

export default DateTimePicker;