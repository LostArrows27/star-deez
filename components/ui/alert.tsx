import { alertError, useAlertError } from "@/hooks/useAlertError";
import { AlertDialog, Button, XStack, YStack } from "tamagui";

export function AlertError() {
  const { isOpen, message, onOpen, onClose } = useAlertError();
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <AlertDialog.Trigger display="none" asChild>
        <Button>Show Alert</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <AlertDialog.Content
          bordered
          elevate
          width={"90%"}
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Error</AlertDialog.Title>

            <AlertDialog.Description>{message}</AlertDialog.Description>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Action asChild>
                <Button theme="active">Close</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
