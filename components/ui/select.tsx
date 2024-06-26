import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import type { FontSizeTokens, SelectProps } from "tamagui";
import {
  Adapt,
  Label,
  Select,
  Sheet,
  XStack,
  YStack,
  getFontSize,
} from "tamagui";

export function SelectTama(
  props: SelectProps & {
    items: { value: string; label: string }[];
    setVal: React.Dispatch<React.SetStateAction<string>>;
    val: string;
    placeholder?: string;
    label?: string;
    outline?: boolean;
    className?: string;
    normal?: boolean;
  }
) {
  return (
    <Select
      value={props.val}
      onValueChange={(value) => {
        props.setVal(value);
      }}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger
        backgroundColor={props?.outline ? "$colorTransparent" : "$green2Light"}
        focusStyle={{ borderColor: props.outline ? " $color9" : "" }}
        width={"100%"}
        iconAfter={ChevronDown}
      >
        <Select.Value
          placeholder={props.placeholder ? props.placeholder : "Gender"}
          color={!props?.outline ? "$color10" : "black"}
        />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          snapPointsMode="fit"
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height={"50%"}
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          animation="quick"
          animateOnly={["transform", "opacity"]}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
          height={"50%"}
        >
          <Select.Group>
            <Select.Label>{props.label ? props.label : "Gender"}</Select.Label>
            {/* for longer lists memoizing these is useful */}
            <ScrollView className={props.className}>
              {useMemo(
                () =>
                  props.items.map((item, i) => {
                    return (
                      <Select.Item
                        index={i}
                        key={item.value}
                        value={
                          props.normal ? item.label : item.value.toLowerCase()
                        }
                      >
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  }),
                [props.items]
              )}
            </ScrollView>
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
