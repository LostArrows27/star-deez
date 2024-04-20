import { statusArr } from "@/constants/Status";
import { useFilterStatus } from "@/hooks/home/tracking/useFilterStatus";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useMemo, useState } from "react";
import { Adapt, Select, Sheet, YStack, getFontSize } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

// "standby" | "learning" | "finished

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
                statusArr.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.value} value={item.value}>
                      <Select.ItemText>{item.title}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [statusArr]
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
