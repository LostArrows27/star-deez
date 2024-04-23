import { useSearchResult } from "@/hooks/home/search/useSearchResult";
import { useGetInitData } from "@/hooks/useGetInitData";
import { supabase } from "@/lib/supabase";
import { View, Text } from "react-native";
import SearchHistory from "./search-history";
import { Spinner } from "tamagui";
import ResultList from "./result-list";

const SearchResult = () => {
  const { showHistory, setHistory, loading, setLoading } = useSearchResult();

  useGetInitData(async (user) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("search_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setHistory(data || []);
    }
    setLoading(false);
  });

  return (
    <View className="mt-6">
      {loading ? (
        <View className="pt-16">
          <Spinner size="large" color={"$green9Light"} />
        </View>
      ) : showHistory ? (
        <SearchHistory />
      ) : (
        <ResultList />
      )}
    </View>
  );
};

export default SearchResult;
