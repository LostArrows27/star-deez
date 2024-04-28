import { useAuth } from "@/hooks/auth/useAuth";
import { useParticipantsList } from "@/hooks/home/live-participants/useParticipantsList";
import { useClockTimer } from "@/hooks/home/live-study/useManageStudyClock";
import { RotateCcw } from "@tamagui/lucide-icons";
import { Button, XStack, YStack } from "tamagui";
import { AlertDialog } from "tamagui";
const ResetButton = () => {
  const { reset } = useClockTimer();

  const room = useParticipantsList((state) => state.room);

  const { userDetails } = useAuth();

  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button
          theme={"blue"}
          borderRadius={99999999}
          borderWidth={2}
          alignItems="center"
          justifyContent="center"
          borderColor={"$color7"}
          p={10}
          w={"$6"}
          h={"$6"}
          backgroundColor={"$colorTransparent"}
        >
          <RotateCcw size={"$1.5"} color={"$color7"} />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay key="overlay" opacity={0.5} />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Reset</AlertDialog.Title>
            <AlertDialog.Description>
              Do you wanna reset the timer?
            </AlertDialog.Description>

            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  onPress={() => {
                    room?.untrack({
                      presence: {
                        key: userDetails!.id,
                      },
                    });
                    reset();
                  }}
                  theme="active"
                >
                  Reset
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export default ResetButton;
