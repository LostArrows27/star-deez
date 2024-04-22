import SearchHeader from "@/components/home/search/search-header";
import SearchResult from "@/components/home/search/search-result";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { View } from "tamagui";

const SearchPage = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Explore",
          headerTransparent: false,
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <ScrollView
        className="w-full p-4 px-5"
        showsVerticalScrollIndicator={false}
      >
        <SearchHeader />
        <SearchResult />
      </ScrollView>
    </View>
  );
};

export default SearchPage;
