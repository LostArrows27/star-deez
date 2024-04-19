import {
  UnitRow,
  useCreateDocument,
} from "@/hooks/modal/tracking/useCreateDocument";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import { Newspaper } from "@tamagui/lucide-icons";
import { useState } from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import { Dialog, Button, Adapt, Sheet } from "tamagui"; //
import CreateUnit from "./create-unit";
import { useAuth } from "@/hooks/auth/useAuth";

const PickUnit = () => {
  const { unit, setUnit } = useCreateDocument();

  const [units, setUnits] = useState<UnitRow[]>([]);
  const [open, setOpen] = useState(false);

  const { userDetails } = useAuth();

  const { loading } = useGetInitData(async (user) => {
    const { data, error } = await supabase
      .from("unit")
      .select("*")
      .eq("user_id", user.id);

    if (error) return;

    setUnits(
      data.map((unitData) => {
        return {
          id: unitData.id,
          name: unitData.name,
        };
      })
    );
  });

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
          icon={<Newspaper color={"green"} />}
          chromeless
        >
          {unit ? unit.name : "Choose unit"}
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
          <Dialog.Title fontSize={"$8"}>Select document unit</Dialog.Title>

          {loading ? (
            <View className="center flex-1 h-full">
              <ActivityIndicator size={"large"} color={"green"} />
            </View>
          ) : (
            <View>
              <CreateUnit userDetails={userDetails} setUnits={setUnits} />
              <FlatList
                className="h-full"
                showsVerticalScrollIndicator={false}
                data={units}
                keyExtractor={(item) => item.id}
                renderItem={(data) => (
                  <Button
                    key={data.index}
                    scaleIcon={2}
                    px={20}
                    height={"$5"}
                    my={10}
                    fontSize={"$5"}
                    justifyContent="flex-start"
                    onPress={() => {
                      setUnit(data.item);
                      setOpen(false);
                    }}
                    themeInverse
                    backgroundColor={"$green9Dark"}
                  >
                    {data.item.name}
                  </Button>
                )}
              />
            </View>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default PickUnit;
