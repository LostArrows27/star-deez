import { ActivityIndicator, RefreshControl, View } from "react-native";
import { Text } from "react-native";
import PostItem from "./post-item";
import { FlatList } from "react-native";
import { postData } from "../../../constants/Post";
import { useCallback, useEffect, useRef, useState } from "react";
import { StudyRecord } from "@/types/supabase-util-types";
import { supabase } from "@/lib/supabase";
import { Spinner } from "tamagui";
import { useAuth } from "@/hooks/auth/useAuth";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

const PostLists = ({ type }: { type: "all" | "following" | "profiles" }) => {
  // TODO: custom infinite scroll
  const [posts, setPosts] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { userDetails } = useAuth();

  const getAllPosts = useRef(
    supabase
      .from("study_records")
      .select(
        "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
      )
      .order("created_at", { ascending: false })
  );
  const getFollowingPosts = useRef(
    supabase
      .from("study_records")
      .select(
        "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
      )
      .order("created_at", { ascending: false })
  );

  const getProfilePosts = useRef(
    supabase
      .from("study_records")
      .select(
        "*, likes(count),profiles(id,avatar,first_name,last_name),document(id,title,cover,unit(name))"
      )
      .order("created_at", { ascending: false })
  );

  useEffect(() => {
    (async () => {
      const queryFunc =
        type === "all"
          ? getAllPosts
          : type === "following"
          ? getFollowingPosts
          : getProfilePosts;

      const { data, error } = await queryFunc.current.limit(3);

      setInitialLoad(false);

      if (error || !data) return console.log(error);

      setPosts(data as StudyRecord[]);
    })();
  }, []);

  const loadMorePosts = async () => {
    if (!hasMore) return;
    setLoading(true);
    const queryFunc =
      type === "all"
        ? getAllPosts
        : type === "following"
        ? getFollowingPosts
        : getProfilePosts;

    const { data, error } = await queryFunc.current.range(
      posts.length,
      posts.length + 2
    );
    setLoading(false);
    if (error || !data) return console.log(error);
    setPosts([...posts, ...(data as StudyRecord[])]);
    if (data.length < 3) setHasMore(false);
  };

  const reloadPosts = async () => {
    setReload(true);
    const queryFunc =
      type === "all"
        ? getAllPosts
        : type === "following"
        ? getFollowingPosts
        : getProfilePosts;

    const { data, error } = await queryFunc.current.limit(3);

    setReload(false);
    if (error || !data) return console.log(error);
    setPosts(data as StudyRecord[]);
    setHasMore(true);
  };
  return (
    <View className="w-full  bg-white items-center">
      {initialLoad ? (
        <View className="items-center h-full justify-center ">
          <Spinner scale={1} size="large" color="$green10" />
        </View>
      ) : (
        <FlatList
          className="h-full"
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
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={(data) => {
            return <PostItem {...data.item} />;
          }}
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
