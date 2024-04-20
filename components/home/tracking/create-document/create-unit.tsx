import { useAuth } from "@/hooks/auth/useAuth";
import { UnitRow } from "@/hooks/modal/tracking/useCreateDocument";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/supabase-util-types";
import { Activity, Plus } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Dialog, Button, Adapt, Sheet, Input } from "tamagui";
import { AlertDialog, XStack, YStack } from "tamagui";

type CreateUnitProps = {
  setUnits: React.Dispatch<React.SetStateAction<UnitRow[]>>;
  userDetails: Profile | null;
};

const CreateUnit = ({ setUnits, userDetails }: CreateUnitProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  const handleCreateUnit = async () => {
    if (!name || !userDetails || loading) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("unit")
      .insert({
        name: name.trim(),
        user_id: userDetails.id,
      })
      .select();
    if (error) return setLoading(false);
    setUnits((prev) => [
      ...prev,
      {
        id: data[0].id,
        name: data[0].name,
      },
    ]);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button
          scaleIcon={2}
          px={10}
          mb={10}
          height={"$5"}
          fontSize={"$4"}
          justifyContent="flex-start"
          icon={<Plus color={"green"} />}
          gap={0}
          chromeless
        >
          Create unit
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal zIndex={99999999999999999999}>
        <Dialog.Overlay key={"overlay"} />

        <Dialog.Content width={300} zIndex={99999999999999999999}>
          <Dialog.Title fontSize={"$8"}>Create unit</Dialog.Title>
          <YStack>
            <Input
              value={name}
              onChangeText={setName}
              my={10}
              placeholder="Enter unit name..."
              size="$4"
              borderWidth={2}
            />
            <XStack mt={10} gap="$3" justifyContent="flex-end">
              <Dialog.Close asChild>
                <Button>Cancel</Button>
              </Dialog.Close>
              <Dialog.Close
                onPress={async (e) => {
                  setOpen(true);
                  e.stopPropagation();
                  e.preventDefault();
                  await handleCreateUnit();
                }}
                displayWhenAdapted
                asChild
              >
                <Button
                  iconAfter={
                    loading ? (
                      <ActivityIndicator size={"small"} color={"green"} />
                    ) : null
                  }
                  themeInverse
                  backgroundColor={"$green10Dark"}
                  width={120}
                  theme="active"
                  aria-label="Close"
                >
                  Create
                </Button>
              </Dialog.Close>
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default CreateUnit;
