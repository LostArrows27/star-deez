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
import { JobResponse } from "@/types/home/search-job";

const SelectJob = () => {
  const [jobList, setJobList] = useState<string[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const { editInformation, setJob } = useEditInformationStore();

  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedValue) {
      const fetchJob = async () => {
        setLoading(true);
        const res = await axios.post<JobResponse>(
          process.env.EXPO_PUBLIC_SEARCH_JOB_URL as string,
          {
            operationName: "JobTitles",
            variables: {
              keyword: debouncedValue,
              size: 10,
            },
            query:
              "query JobTitles($keyword: String!, $size: Int!) {\n  jobTitles(keyword: $keyword, size: $size) {\n    id\n    label\n    __typename\n  }\n}\n",
          }
        );

        if (res.status === 200) {
          setJobList(res.data.data.jobTitles.map((item) => item.label));
        }
        setLoading(false);
      };

      fetchJob();
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
          {editInformation?.job ? editInformation?.job : "Select job"}
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
          <Dialog.Title fontSize={"$8"}>Search your job</Dialog.Title>
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
              placeholder={"Search job name..."}
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
            data={jobList}
            renderItem={({ item: job, index }) => (
              <StyledPressable
                onPress={() => {
                  setJob(job);
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
                <Text numberOfLines={3}>{job}</Text>
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

export default SelectJob;
