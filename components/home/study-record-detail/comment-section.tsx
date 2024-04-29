import React, { memo, useEffect, useRef, useState } from "react";
import { Spinner, Text, View } from "tamagui";
import CommentItem from "./comment-item";
import { FlatList } from "react-native";
import { useStudyRecordDetails } from "@/hooks/modal/study-record/useStudyRecordDetails";
import { supabase } from "@/lib/supabase";
import { Comment } from "@/types/supabase-util-types";
import { useCommentControl } from "@/hooks/modal/study-record/useCommentControls";
import { Image } from "expo-image";

function CommentSection() {
  const [loading, setLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  // const [scrolling, setScrolling] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { data: details } = useStudyRecordDetails();
  const { comments, setComments } = useCommentControl();
  const [hasMore, setHasMore] = useState(true);
  const loadMorePosts = async () => {
    if (!hasMore || !details) return;
    if (loading) return;
    if (!fetchMore) return setFetchMore(true);
    setLoading(true);

    const { data, error } = await supabase
      .from("comments")
      .select("*, likes(count), profiles(id,avatar,first_name,last_name)")
      .eq("study_record_id", details.id)
      .is("reply_comment_id", null)
      .order("created_at", { ascending: false })
      .range(comments.length, comments.length + 4);

    if (error || !data) return console.log(error);
    const newComments = data as Comment[];
    setComments([...comments, ...newComments]);

    if (data.length < 5) setHasMore(false);
    setLoading(false);
  };

  useEffect(() => {
    //fetch all comments
    if (!details) return;
    (async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*, likes(count), profiles(id,avatar,first_name,last_name)")
        .eq("study_record_id", details.id)
        .is("reply_comment_id", null)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error || !data) return console.log(error);

      setComments(data as Comment[]);
      setInitialLoading(false);
    })();
  }, []);

  return (
    <View h={comments.length > 0 ? "fit" : "$20"} flex={1} mt="$3">
      {!initialLoading ? (
        <FlatList
          className=" h-full gap-4"
          initialNumToRender={1}
          scrollEnabled={comments.length > 2}
          // onScrollBeginDrag={() => setScrolling(true)}
          // onScrollEndDrag={() => setScrolling(false)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePosts}
          data={comments}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          removeClippedSubviews={true}
          ListEmptyComponent={() => {
            return (
              <View
                flex={1}
                bg={"transparent"}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  autoplay
                  style={{
                    width: 350 / 2,
                    height: 250 / 2,
                  }}
                  contentFit="cover"
                  source={require("@/assets/images/home/cat_typing.gif")}
                />
                <Text scale={1.2}>No comment yet</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <CommentItem {...item.item} />}
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
        <View
          flex={1}
          bg={"transparent"}
          alignItems="center"
          justifyContent="center"
        >
          <Spinner scale={1} size="large" color="$green10" />
        </View>
      )}
    </View>
  );
}

export default memo(CommentSection);
