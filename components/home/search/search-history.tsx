import { useSearchResult } from "@/hooks/home/search/useSearchResult";
import { supabase } from "@/lib/supabase";
import { Clock8, X } from "@tamagui/lucide-icons";
import { View, Text } from "react-native";

import { PlatformPressable } from "@react-navigation/elements";
import { Image } from "expo-image";
import StyledText from "@/components/styled-text";

const SearchHistory = () => {
  const { history, removeHistory, setSearch, moveToTop, setLoading } =
    useSearchResult();

  return (
    <View className="">
      <Text className="text-emerald-600 mt-5 mb-5 text-lg">
        Previous searches
      </Text>
      {history.length > 0 ? (
        history.map((item, index) => {
          if (index > 7) return;
          return (
            <PlatformPressable
              onPress={async () => {
                setSearch(item.search_word);
                setLoading(true);
                const { data, error } = await supabase
                  .from("search_history")
                  .upsert({
                    search_word: item.search_word,
                    user_id: item.user_id,
                    created_at: new Date().toISOString(),
                  });

                if (!error) {
                  moveToTop(item);
                }
              }}
              className="flex-row items-center w-full gap-5 px-1 py-5 border-b border-gray-200"
              key={index}
            >
              <Clock8 color={"$gray8Light"} />
              <Text className="flex-1 text-lg" numberOfLines={1}>
                {item.search_word}
              </Text>
              <X
                onPress={async () => {
                  const { data, error } = await supabase
                    .from("search_history")
                    .delete()
                    .eq("search_word", item.search_word)
                    .eq("user_id", item.user_id);

                  if (!error) {
                    removeHistory(index);
                  }
                }}
                size={"$1"}
                color={"$gray8Light"}
              />
            </PlatformPressable>
          );
        })
      ) : (
        <View className=" items-center h-full mt-16">
          <Image
            autoplay
            style={{
              width: 200,
              height: 200,
            }}
            contentFit="cover"
            source={require("@/assets/images/search/cat_search.gif")}
          />
          <StyledText
            color={"$gray10Light"}
            lineHeight={"$5"}
            textAlign="center"
          >
            Try search more to see your search history
          </StyledText>
        </View>
      )}
    </View>
  );
};

export default SearchHistory;
