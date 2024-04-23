import { RefreshControl, View } from "react-native";
import PostItem from "./post-item";
import { FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { StudyRecord } from "@/types/supabase-util-types";
import { supabase } from "@/lib/supabase";
import { Spinner } from "tamagui";
import { useAuth } from "@/hooks/auth/useAuth";
import { Stack } from "expo-router";

const PostLists = ({ type }: { type: "all" | "following" | "profiles" }) => {
  const [posts, setPosts] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { userDetails } = useAuth();

  useEffect(() => {
    (async () => {
      if (!userDetails) return;
      const queryFunc =
        type === "all"
          ? supabase
              .from("study_records")
              .select(
                "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
              )
              .order("created_at", { ascending: false })
          : type === "following"
          ? supabase
              .from("study_records")
              .select(
                "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
              )
              .order("created_at", { ascending: false })
          : supabase
              .from("study_records")
              .select(
                "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
              )
              .eq("user_id", userDetails?.id)
              .order("created_at", { ascending: false });

      const { data, error } = await queryFunc.limit(3);

      setInitialLoad(false);

      if (error || !data) return console.log(error);

      setPosts(data as StudyRecord[]);
    })();
  }, []);

  const renderItem = (data: { item: StudyRecord }) => {
    return <PostItem {...data.item} />;
  };

  const loadMorePosts = async () => {
    if (!hasMore) return;
    if (!userDetails) return;
    setLoading(true);
    const queryFunc =
      type === "all"
        ? supabase
            .from("study_records")
            .select(
              "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
            )
            .order("created_at", { ascending: false })
        : type === "following"
        ? supabase
            .from("study_records")
            .select(
              "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
            )
            .order("created_at", { ascending: false })
        : supabase
            .from("study_records")
            .select(
              "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
            )
            .eq("user_id", userDetails?.id)
            .order("created_at", { ascending: false });

    const { data, error } = await queryFunc.range(
      posts.length,
      posts.length + 2
    );

    if (error || !data) return console.log(error);
    setPosts([...posts, ...(data as StudyRecord[])]);

    if (data.length < 3) setHasMore(false);
    setLoading(false);
  };

  const reloadPosts = useCallback(async () => {
    if (!userDetails) return;
    setReload(true);

    const queryFunc =
      type === "all"
        ? supabase
            .from("study_records")
            .select(
              "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
            )
            .order("created_at", { ascending: false })
        : type === "following"
        ? supabase
            .from("study_records")
            .select(
              "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
            )
            .order("created_at", { ascending: false })
        : supabase
            .from("study_records")
            .select(
              "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
            )
            .eq("user_id", userDetails?.id)
            .order("created_at", { ascending: false });

    const { data, error } = await queryFunc.limit(3);

    if (error || !data) return console.log(error);
    setPosts(data as StudyRecord[]);
    setHasMore(true);
    setReload(false);
  }, [userDetails?.id]);

  return (
    <View className="items-center w-full bg-white">
      {initialLoad ? (
        <View className=" items-center justify-center h-full">
          <Spinner scale={1} size="large" color="$green10" />
        </View>
      ) : (
        <FlatList
          className="h-full"
          initialNumToRender={3}
          scrollEnabled={posts.length > 1}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              colors={["#3cb179", "#3cb179"]}
              refreshing={reload}
              onRefresh={reloadPosts}
            />
          }
          data={[...posts]}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={() => {
            return (
              <>
                {loading && (
                  <View className="items-center justify-center p-4">
                    <Spinner scale={1} size="large" color="$green10" />
                  </View>
                )}
              </>
            );
          }}
        />
      )}
    </View>
  );
};

export default PostLists;
