import { RefreshControl, View } from "react-native";
import PostItem from "./post-item";
import { FlatList } from "react-native";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { StudyRecord } from "@/types/supabase-util-types";
import { H2, H3, Spinner } from "tamagui";
import { useAuth } from "@/hooks/auth/useAuth";
import queryPost from "@/utils/query-post";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import StyledText from "@/components/styled-text";

const MemoizedPostItem = memo(PostItem);

const renderItem = ({ item }: { item: StudyRecord }) => (
  <MemoizedPostItem
    id={item.id}
    profile_avatar={item.profiles.avatar!}
    profile_last_name={item.profiles.last_name!}
    profile_first_name={item.profiles.first_name!}
    comment={item.comment!}
    image={item.image!}
    document_title={item.document.title}
    document_unit_name={item.document.unit.name}
    document_cover={item.document.cover!}
    duration={item.duration}
    begin_at={item.begin_at}
    end_at={item.end_at}
    created_at={item.created_at}
    likes={item.likes[0].count}
  />
);

const PostLists = (props: {
  type: "all" | "following" | "profiles";
  profile_id: string | null;
}) => {
  const { type, profile_id } = props;

  const [posts, setPosts] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { userDetails } = useAuth();

  useFocusEffect(
    useCallback(() => {
      // Actions to perform when the screen is focused
      const queryFunc = queryPost(type, profile_id);

      (async () => {
        if (!userDetails) return;
        setLoading(true);
        const { data, error } = await queryFunc.limit(3);

        setInitialLoad(false);

        if (error || !data) return console.log(error);

        setPosts(data as StudyRecord[]);
        setLoading(false);
      })();
      return () => {
        // Actions to perform when the screen goes out of focus
        // Clean up heavy resources here
        setPosts([]);
        setLoading(false);
      };
    }, [])
  );

  useEffect(() => {
    (async () => {
      if (!userDetails) return;
      const queryFunc = queryPost(type, profile_id);

      const { data, error } = await queryFunc.limit(3);

      setInitialLoad(false);

      if (error || !data) return console.log(error);

      setPosts(data as StudyRecord[]);
    })();
  }, []);

  const loadMorePosts = async () => {
    if (!hasMore) return;
    if (!userDetails) return;
    if (loading) return;

    setLoading(true);
    const queryFunc = queryPost(type, profile_id);

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

    const queryFunc = queryPost(type, profile_id);

    const { data, error } = await queryFunc.limit(3);

    if (error || !data) return console.log(error);
    setPosts(data as StudyRecord[]);
    setHasMore(true);
    setReload(false);
  }, [userDetails?.id]);

  // useRef to see re-redner time
  const renderCount = useRef(0);

  return (
    <View className="items-center w-full bg-white">
      {initialLoad ? (
        <View className=" items-center justify-center h-full">
          <Spinner scale={1} size="large" color="$green10" />
        </View>
      ) : posts.length > 0 ? (
        <FlatList
          className="h-full"
          initialNumToRender={3}
          scrollEnabled={posts.length > 1}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePosts}
          refreshControl={
            <RefreshControl
              colors={["#3cb179", "#3cb179"]}
              refreshing={reload}
              onRefresh={reloadPosts}
            />
          }
          data={[...posts]}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          removeClippedSubviews={true}
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
      ) : (
        <View className="center h-full">
          <Image
            autoplay
            style={{
              width: 498 / 2,
              height: 329 / 2,
            }}
            contentFit="cover"
            source={require("@/assets/images/home/cat_typing.gif")}
          />
          <H3 mt="$4" color={"$color8"}>
            No posts yet
          </H3>
          <StyledText
            color={"$gray10Light"}
            letterSpacing={"$10"}
            textAlign="center"
            mt="$3"
          >
            Please follow more people to see their posts
          </StyledText>
        </View>
      )}
    </View>
  );
};

export default PostLists;
