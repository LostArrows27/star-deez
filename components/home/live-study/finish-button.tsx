import { useAuth } from "@/hooks/auth/useAuth";
import { useParticipantsList } from "@/hooks/home/live-participants/useParticipantsList";
import { useClockTimer } from "@/hooks/home/live-study/useManageStudyClock";
import { Check } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button, XStack, YStack } from "tamagui";
import { AlertDialog } from "tamagui";
const FinishButton = () => {
  const { stop, start, time, reset } = useClockTimer();
  const room = useParticipantsList((state) => state.room);
  const { userDetails } = useAuth();

  return (
    <AlertDialog
      onOpenChange={(open) => {
        let userData = {
          id: userDetails!.id,
          avatar: userDetails!.avatar,
          name: userDetails!.full_name,
        };

        if (open) {
          room?.untrack({
            presence: {
              key: userDetails!.id,
            },
          });
          return stop();
        }

        if (time !== 0) {
          room?.track(
            {
              ...userData,
              isRunning: true,
              studyTime: time,
            },
            {
              presence: {
                key: userDetails!.id,
              },
            }
          );
          return start();
        }
      }}
    >
      <AlertDialog.Trigger asChild>
        <Button
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
          <Check size={"$1.5"} color={"$color7"} />
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
            <AlertDialog.Title size={"$8"}>
              Create study session
            </AlertDialog.Title>
            <AlertDialog.Description>
              Do you wanna create study record with this study amount?
            </AlertDialog.Description>

            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  onPress={() => {
                    if (time > 0) {
                      router.push({
                        pathname: `/tracking/create-study-record`,
                        params: {
                          learning_amount: time,
                        },
                      });
                    }

                    reset();
                  }}
                  theme="active"
                >
                  Create
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export default FinishButton;
