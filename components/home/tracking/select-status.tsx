import { useFilterStatus } from "@/hooks/home/tracking/useFilterStatus";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useMemo, useState } from "react";
import type { FontSizeTokens, SelectProps } from "tamagui";
import { Adapt, Select, Sheet, YStack, getFontSize } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

const items = [{ name: "Studying" }, { name: "Stand By" }, { name: "Done" }];

export function SelectStatus() {
  const { status, setStatus } = useFilterStatus();

  return (
    <Select value={status} onValueChange={setStatus} disablePreventBodyScroll>
      <Select.Trigger
        borderWidth={0}
        backgroundColor={"$colorTransparent"}
        width={150}
        iconAfter={ChevronDown}
        scaleIcon={1.4}
      >
        <Select.Value
          fontSize={"$5"}
          backgroundColor={"$colorTransparent"}
          placeholder="Select status"
        />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet dismissOnSnapToBottom snapPointsMode="fit" modal>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$2"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:

          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Studying Status</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items]
            )}
          </Select.Group>
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
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
