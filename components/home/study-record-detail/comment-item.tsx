import { View } from "react-native";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Text } from "tamagui";
import CommentOptions from "./comment-options";
import CommentInput from "./comment-input";

function CommentItem() {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [openReply, setOpenReply] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  return (
    <View className="w-full ">
      <View className="flex-row items-start">
        <Avatar
          style={{
            marginRight: 8,
          }}
          onPress={() => {
            //  navigation.openDrawer();
          }}
          circular
          size="$3"
        >
          <Avatar.Image
            src={require("@/assets/images/header/placeholder.jpg")}
          />
          <Avatar.Fallback bc="$green9" />
        </Avatar>
        <View className="flex-1">
          <Text color={"$color8"} fontWeight={"700"}>
            Nguyen Nhat Minh
          </Text>
          <Text
            numberOfLines={textShown ? undefined : 3}
            onTextLayout={onTextLayout}
          >
            Content this is a comment test Content this is a comment test
            Content this is a comment test Content this is a comment test
            Content this is a comment test
          </Text>
          {lengthMore && (
            <Text onPress={toggleNumberOfLines} color={"$gray8Light"}>
              {textShown ? "Read less" : "Read more"}
            </Text>
          )}
          <CommentOptions setOpenReply={setOpenReply} />
          {openReply && (
            <View className="mt-3">
              <CommentItem />
              <CommentInput />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default memo(CommentItem);
