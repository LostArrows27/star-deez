import { Image } from "expo-image";
import useEditInformationStore from "@/hooks/home/edit-profile/useEditInformation";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import { useAuth } from "@/hooks/auth/useAuth";
import { Adapt, Button, Dialog, Input, Sheet, Spinner } from "tamagui";
import { Search } from "@tamagui/lucide-icons";
import { SearchResult } from "@/types/home/search-school";
import { useDebounce } from "@/hooks/useDebounce";
import StyledPressable from "@/components/styled-pressable";

const SelectSchool = () => {
  const [universityList, setUniversityList] = useState<string[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const { editInformation, setSchool } = useEditInformationStore();

  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedValue) {
      const fetchSchool = async () => {
        setLoading(true);
        const res = await axios.post<SearchResult>(
          process.env.EXPO_PUBLIC_SEARCH_SCHOOL_URL as string,
          {
            requests: [
              {
                indexName: "prod_enterprise_universities",
                params: `query=${debouncedValue}&hitsPerPage=20&page=0`,
              },
            ],
          }
        );

        if (res.status === 200) {
          setUniversityList(
            res.data.results[0].hits.map((item) => item.institution)
          );
        }
        setLoading(false);
      };

      fetchSchool();
    }
  }, [debouncedValue]);

  return (
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
          {editInformation?.school ? editInformation.school : "Select school"}
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
          <Dialog.Title fontSize={"$8"}>Search your school</Dialog.Title>
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
              placeholder={"Search school name..."}
              borderColor={"$green9Light"}
              w={"80%"}
              pr={0}
              bg="white"
              flex={1}
              size={"$4"}
              pl={"$8"}
            ></Input>
            {loading && (
              <Spinner
                pos={"absolute"}
                zIndex={3}
                right={20}
                color={"$green8Light"}
              ></Spinner>
            )}
          </View>
          <FlatList
            initialNumToRender={8}
            data={universityList}
            renderItem={({ item: school, index }) => (
              <StyledPressable
                onPress={() => {
                  setSchool(school);
                  setOpen(false);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  marginBottom: 10,
                }}
                key={index}
              >
                <Text numberOfLines={3}>{school}</Text>
              </StyledPressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            className="relative flex-col h-[300px] pb-20"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default SelectSchool;
