import StyledPressable from "@/components/styled-pressable";
import { useSearchResult } from "@/hooks/home/search/useSearchResult";
import { View, Text } from "react-native";
import { Avatar, Button } from "tamagui";
import { router } from "expo-router";

const ResultList = () => {
  const { searchResults, loading } = useSearchResult();

  return (
    <View>
      <Text className="text-emerald-600 mt-5 mb-5 text-lg">Search results</Text>
      {searchResults.length === 0 ? (
        <Text className="text-gray-400">
          No results found. Please try another search.
        </Text>
      ) : (
        searchResults.map((result, index) => (
          <StyledPressable
            onPress={() => {
              router.push(`/profile/${result.id}`);
            }}
            key={index}
            className="flex-row px-2 gap-4  h-[80px] pt-2"
          >
            <View className=" justify-start pt-2">
              <Avatar circular size="$4">
                <Avatar.Image
                  src={
                    result
                      ? result.avatar
                      : require("@/assets/images/header/placeholder.jpg")
                  }
                />
                <Avatar.Fallback bc="$green9" />
              </Avatar>
            </View>
            <View className="flex-row items-center justify-between flex-1 h-full border-b border-gray-200">
              <View className="h-full">
                <Text
                  numberOfLines={1}
                  className="text-emerald-600 mt-1 mb-1 text-lg font-medium"
                >
                  {result.full_name}
                </Text>
                <Text className="text-gray-400">
                  {result.bio || "Nah I'd not have bio"}
                </Text>
              </View>
              <Button
                onPress={() => {
                  router.push(`/profile/${result.id}`);
                }}
                size={"$3"}
              >
                Follow
              </Button>
            </View>
          </StyledPressable>
        ))
      )}
    </View>
  );
};

export default ResultList;
