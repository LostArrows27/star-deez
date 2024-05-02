import { Image } from "expo-image";
import useEditInformationStore from "@/hooks/home/edit-profile/useEditInformation";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import { useAuth } from "@/hooks/auth/useAuth";
import { Adapt, Button, Dialog, Input, Sheet } from "tamagui";
import { Search } from "@tamagui/lucide-icons";
import convertFlag from "@/utils/convert-flag-code";
import StyledText from "@/components/styled-text";

type Country = {
  name: string;
  code: string;
};

type CountryResponse = {
  [key: string]: string;
};

const SelectCountry = () => {
  // country in code~name format
  const [countrys, setCountrys] = useState<Country[]>([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const { editInformation, setCountry } = useEditInformationStore();

  const { userDetails } = useAuth();

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await axios.get<CountryResponse>(
        "https://flagcdn.com/en/codes.json"
      );

      if (response.status === 200) {
        const countrys = Object.entries(response.data).map(([code, name]) => ({
          code,
          name,
        }));
        setCountrys(countrys);
      }
    };

    fetchCountry();
  }, []);

  return (
    <View className="flex-1 gap-3">
      <Text>Country</Text>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)} modal>
        <Dialog.Trigger asChild>
          <Button
            onPress={() => {
              setOpen(true);
            }}
            alignItems="center"
            backgroundColor={"$colorTransparent"}
            px={"$3.5"}
            borderColor={"$green5Light"}
            borderWidth={"$0.5"}
            width={"100%"}
            columnGap={4}
            justifyContent="flex-start"
          >
            <Image
              style={{
                width: 16 * 1.5,
                height: 12 * 1.5,
              }}
              source={
                selectedCountry
                  ? convertFlag(selectedCountry.code, 64, 48)
                  : userDetails?.country
                  ? convertFlag(userDetails?.country.split("~")[0], 64, 48)
                  : "https://flagcdn.com/64x48/vn.png"
              }
            />
            <StyledText color={"black"}>
              {editInformation.country
                ? editInformation.country.split("~")[1]
                : userDetails?.country || "Select a country"}
            </StyledText>
          </Button>
        </Dialog.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            modal
            dismissOnSnapToBottom
            snapPointsMode="fit"
            animation="medium"
          >
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
            <Dialog.Title fontSize={"$8"}>Select your country</Dialog.Title>
            <View className="relative flex-row items-center justify-between w-full">
              <Search
                pos={"absolute"}
                zIndex={3}
                left={10}
                size={"$1.4"}
                color={"$gray8Light"}
              ></Search>
              <Input
                onChangeText={(text) => {
                  setSearch(text);
                }}
                placeholderTextColor={"$gray8Light"}
                placeholder={"Search country name..."}
                borderColor={"$green9Light"}
                w={"80%"}
                pr={0}
                bg="white"
                flex={1}
                size={"$4"}
                pl={"$8"}
              ></Input>
            </View>
            <FlatList
              initialNumToRender={8}
              data={countrys.filter((country) =>
                country.name.toLowerCase().includes(search.toLowerCase())
              )}
              renderItem={({ item: country, index }) => (
                <Button
                  onPress={() => {
                    setCountry(country.code + "~" + country.name);
                    setSelectedCountry(country);
                    setOpen(false);
                  }}
                  bg={"$colorTransparent"}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 10,
                  }}
                  key={index}
                >
                  <Image
                    style={{
                      width: 32,
                      height: 24,
                      marginRight: 20,
                    }}
                    source={convertFlag(country.code, 64, 48)}
                  />
                  <Text>{country.name}</Text>
                </Button>
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              className="relative flex-col h-[300px] pb-20"
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
};

export default SelectCountry;
