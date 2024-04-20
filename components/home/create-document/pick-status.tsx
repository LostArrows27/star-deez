import { statusArr } from "@/constants/Status";
import {
  Status,
  useCreateDocument,
} from "@/hooks/modal/tracking/useCreateDocument";
import { CheckSquare, Timer, TimerOff } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Dialog, Button, Adapt, Sheet } from "tamagui"; //

function convertStatusToIcon(status: Status) {
  switch (status) {
    case "learning":
      return <Timer color={"yellow8"} />;
    case "standby":
      return <TimerOff color={"red"} />;
    case "finished":
      return <CheckSquare color={"green"} />;
  }
}

const PickStatus = () => {
  const { status, setStatus } = useCreateDocument();

  const [open, setOpen] = useState(false);

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button
          scaleIcon={2.5}
          px={10}
          height={"$5"}
          fontSize={"$4"}
          justifyContent="flex-start"
          icon={convertStatusToIcon(status || "learning")}
          chromeless
        >
          {statusArr.find((data) => data.value === status)?.title ||
            "Choose status"}
        </Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content key="content">
          <Dialog.Title fontSize={"$8"}>Select status</Dialog.Title>
          {statusArr.map((data, key) => {
            if (data.value === "all") return;
            return (
              <Button
                key={key}
                scaleIcon={2}
                px={10}
                height={"$5"}
                fontSize={"$4"}
                justifyContent="flex-start"
                icon={convertStatusToIcon(data.value as Status)}
                chromeless
                onPress={() => {
                  setStatus(data.value as Status);
                  setOpen(false);
                }}
              >
                {data.title}
              </Button>
            );
          })}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default PickStatus;
