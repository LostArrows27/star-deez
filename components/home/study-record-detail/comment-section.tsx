import React, { memo, useState } from "react";
import { ScrollView, Spinner, Text, View } from "tamagui";
import CommentItem from "./comment-item";
import { FlatList } from "react-native";

function CommentSection() {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]);
  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setComments([
        ...comments,
        { id: (Number(comments[comments.length - 1].id) + 1).toString() },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <View flex={1} mt="$3">
      <FlatList
        className="h-full gap-4"
        initialNumToRender={3}
        // scrollEnabled={posts.length > 1}
        // onScrollBeginDrag={() => setScrolling(true)}
        // onScrollEndDrag={() => setScrolling(false)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMorePosts}
        // refreshControl={
        //   <RefreshControl
        //     colors={["#3cb179", "#3cb179"]}
        //     refreshing={reload}
        //     onRefresh={reloadPosts}
        //   />
        // }
        data={comments}
        // maxToRenderPerBatch={5}
        // updateCellsBatchingPeriod={30}
        // removeClippedSubviews={true}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <CommentItem />}
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
    </View>
  );
}

export default memo(CommentSection);
