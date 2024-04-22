import StyledText from "@/components/styled-text";
import useUserID from "@/hooks/auth/useUserID";
import { useSearchResult } from "@/hooks/home/search/useSearchResult";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/supabase-util-types";
import { Search } from "@tamagui/lucide-icons";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { Input } from "tamagui";

const SearchHeader = () => {
  const {
    searchResults,
    setSearchResults,
    loading,
    setLoading,
    setShowHistory,
    search,
    setSearch,
    addHistory,
    history,
    moveToTop,
  } = useSearchResult();

  const debouncedValue = useDebounce(search, 500);

  const id = useUserID();

  const saveSearch = async () => {
    if (!id || !search) return;
    const { data, error } = await supabase
      .from("search_history")
      .upsert({
        search_word: search,
        user_id: id,
        created_at: new Date().toISOString(),
      })
      .select();

    if (!error) {
      //  check if the search word is already in the history
      const isExist = history.find((item) => item.search_word === search);
      if (isExist) {
        return moveToTop(isExist);
      }
      addHistory({
        search_word: search,
        user_id: id,
        created_at: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    const searchUser = async () => {
      if (!debouncedValue || !search) return;

      setLoading(true);
      const { data, error } = await supabase
        .rpc("search_profiles", {
          search_term: debouncedValue,
        })
        .returns<Profile[]>();

      if (!error) {
        setSearchResults(data || []);
      }
      setLoading(false);
    };

    searchUser();
  }, [debouncedValue]);

  useEffect(() => {
    if (search === "") {
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
  }, [search]);

  return (
    <View className="mt-5">
      <View className="relative flex-row items-center justify-between w-full">
        <Search
          pos={"absolute"}
          zIndex={3}
          left={10}
          size={"$1.4"}
          color={"$gray8Light"}
        ></Search>
        <Input
          onBlur={saveSearch}
          onChangeText={(e) => {
            if (e === "") {
              setSearch(e);

              return setLoading(false);
            }
            setSearch(e);
            setLoading(true);
          }}
          placeholderTextColor={"$gray8Light"}
          placeholder={"Search username, email..."}
          borderColor={"$green9Light"}
          w={"80%"}
          pr={0}
          value={search}
          bg="white"
          flex={1}
          size={"$4"}
          pl={"$8"}
        ></Input>
        <View
          onTouchStart={() => {
            setSearch("");
          }}
        >
          <StyledText
            onPress={() => {
              setSearch("");
            }}
            pressStyle={{
              textDecorationLine: "underline",
              textDecorationColor: "$green8Light",
            }}
            ml={24}
            color={"$green8Light"}
          >
            Cancel
          </StyledText>
        </View>
      </View>
    </View>
  );
};

export default SearchHeader;
