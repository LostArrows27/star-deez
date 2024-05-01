import { Pressable, Text } from "react-native";
import React, { FC, Ref, useEffect, useMemo, useRef, useState } from "react";
import { Input, Spinner, View } from "tamagui";
import { Plane, Send, Smile, X } from "@tamagui/lucide-icons";
import {
  MentionInput,
  MentionSuggestionsProps,
  PartType,
  Suggestion,
} from "react-native-controlled-mentions";
import { Comment, Profile } from "@/types/supabase-util-types";
import { useAuth } from "@/hooks/auth/useAuth";
import { supabase } from "@/lib/supabase";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { mentionRegEx } from "react-native-controlled-mentions";
import { useGlobalSearchParams } from "expo-router";
import { useToastController } from "@tamagui/toast";
import { useStudyRecordDetails } from "@/hooks/modal/study-record/useStudyRecordDetails";
import { useCommentControl } from "@/hooks/modal/study-record/useCommentControls";
import { TextInput } from "react-native";
import StyledPressable from "@/components/styled-pressable";
export default function CommentInput() {
  const { id } = useGlobalSearchParams();
  const { replyComment, setInputRef, setReplyComment } = useCommentControl();
  const [value, setValue] = useState("");
  const ref = useRef<TextInput | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const { userDetails } = useAuth();
  const { data: details } = useStudyRecordDetails();
  const { comments, setComments } = useCommentControl();

  useEffect(() => {
    if (!replyComment) return;
    if (replyComment.profile_id !== userDetails?.id) {
      setValue(
        `@[${replyComment.last_name} ${replyComment.first_name}](${replyComment.profile_id}) `
      );
    }
  }, [replyComment, userDetails?.id]);
  useEffect(() => {
    (async () => {
      if (!userDetails?.id || !details) return;
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id,first_name,last_name")
        .neq("id", userDetails.id);
      if (error || !profiles) return console.log(error);

      const tmp = profiles.map((profile) => ({
        id: profile.id,
        name: `${profile.last_name} ${profile.first_name}`,
      }));

      setSuggestions(tmp);
    })();

    return () => {
      setReplyComment(null);
      setInputRef(null);
    };
  }, [userDetails?.id]);

  const renderSuggestions = ({
    keyword,
    onSuggestionPress,
  }: MentionSuggestionsProps) => {
    if (keyword == null) {
      return null;
    }

    return (
      <View
        position="absolute"
        bottom={"$8"}
        backgroundColor={"$color2"}
        borderWidth="$0.5"
        borderColor={"$color6"}
        borderRadius={"$5"}
      >
        {suggestions.length > 0 ? (
          suggestions
            .filter((one) =>
              one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
            )
            .map((one) => (
              <Pressable
                key={one.id}
                onPress={() => onSuggestionPress(one)}
                style={{ padding: 12 }}
              >
                <Text>{one.name}</Text>
              </Pressable>
            ))
        ) : (
          <Spinner scale={1} size="large" color="$green10" />
        )}
      </View>
    );
  };
  const toast = useToastController();
  useEffect(() => {
    if (ref.current) {
      setInputRef(ref);
    }
  }, [ref.current]);
  const handleComment = async () => {
    if (!value || !id || !userDetails?.id || !details) return;
    //extract mentions id from value

    setValue("");

    const { data: newCommentData, error } = await supabase
      .from("comments")
      .insert({
        content: value,
        study_record_id: id as string,
        reply_comment_id: replyComment?.id || null,
        user_id: userDetails.id,
      })
      .select("*,profiles(id,avatar,first_name,last_name),likes(count)")
      .single();
    if (error) {
      return toast.show("Error!!", {
        message: error.message,
        native: false,
      });
    }

    //send noti to reply comment owner
    if (!replyComment?.id) {
      const newComment = comments;
      newComment.unshift(newCommentData as Comment);
      setComments(newComment);
    } else if (replyComment.id !== userDetails?.id) {
      const { data, error: error2 } = await supabase
        .from("notification")
        .select("id,content")
        .eq("receiver_id", replyComment.profile_id)
        .like(
          "link_to",
          "/study-record/" + details.id + "?fcID=" + replyComment.id + "%"
        )
        .like("content", "%reply%")
        .maybeSingle();

      if (error2) {
        console.log(error2);
        return;
      }
      const { count, error: error3 } = await supabase
        .from("comments")
        .select("id", { count: "exact" })
        .eq("reply_comment_id", replyComment.id);

      if (error3 || !count) {
        return;
      }
      let content =
        count > 0
          ? `${userDetails.first_name} and ${
              count - 1
            } others reply to your comment`
          : `${userDetails.last_name} ${userDetails.first_name} reply to your comment`;
      if (data) {
        const { error: updateError } = await supabase
          .from("notification")
          .update({
            content: content,
            sender_id: userDetails.id,
            meta_data: {
              avatar: userDetails?.avatar,
            },
            link_to:
              "/study-record/" +
              details.id +
              "?fcID=" +
              replyComment.id +
              "&ccID=" +
              newCommentData.id,
            is_readed: false,
            is_seen: false,
          })
          .eq("id", data.id);
      } else {
        const { error: updateError } = await supabase
          .from("notification")
          .insert({
            receiver_id: replyComment.profile_id,
            sender_id: userDetails.id,
            link_to:
              "/study-record/" +
              details.id +
              "?fcID=" +
              replyComment.id +
              "&ccID=" +
              newCommentData.id,
            content: content,
            meta_data: {
              avatar: userDetails?.avatar,
            },
            is_readed: false,
            is_seen: false,
          });
      }
    }

    //send notification to mentions user
    const mentions = value.match(mentionRegEx);
    if (mentions) {
      //get all the id from the mentions
      const ids = mentions.map((mention) => {
        const id = new RegExp(mentionRegEx).exec(mention);
        return id ? id[4] : "";
      });
      //filter out the id empty
      const filteredIds = ids.filter(
        (id) =>
          id !== "" && id !== userDetails.id && id !== replyComment?.profile_id
      );

      const { data: notification, error: notiError } = await supabase
        .from("notification")
        .insert(
          (filteredIds as string[]).map((id) => ({
            receiver_id: id,
            sender_id: userDetails.id,
            content: `${userDetails?.last_name} ${userDetails?.first_name} has mentioned you on a post`,
            link_to:
              `/study-record/${details.id}` +
              (replyComment
                ? `?fcID=${replyComment.id}&ccID=${newCommentData.id}`
                : `?fcID=${newCommentData.id}`),
            meta_data: {
              avatar: userDetails?.avatar,
            },
          }))
        );

      if (notiError) {
        return console.log(notiError);
      }
    } else {
      //send notification to post owner
      if (details.user_id !== userDetails.id && !replyComment) {
        const { data, error: error2 } = await supabase
          .from("notification")
          .select("id,content")
          .eq("receiver_id", details.profiles.id)
          .like("link_to", "/study-record/" + details.id + "%")
          .like("content", "%comment%")
          .maybeSingle();

        if (error2) {
          console.log(error2);
          return;
        }
        const { data: currentCount, error: error3 } = await supabase
          .from("study_records")
          .select("comments(count)")
          .eq("id", details.id)
          .single();

        if (error3 || !currentCount) {
          return;
        }

        let content =
          currentCount.comments[0].count > 0
            ? `${userDetails.first_name} and ${
                currentCount.comments[0].count - 1
              } others comment on your post`
            : `${userDetails.last_name} ${userDetails.first_name} comments on your post`;
        if (data) {
          const { error: updateError } = await supabase
            .from("notification")
            .update({
              content: content,
              sender_id: userDetails.id,
              meta_data: {
                avatar: userDetails?.avatar,
              },
              link_to:
                "/study-record/" + details.id + "?fcID=" + newCommentData.id,
              is_readed: false,
              is_seen: false,
            })
            .eq("id", data.id);
        } else {
          const { error: updateError } = await supabase
            .from("notification")
            .insert({
              receiver_id: details.profiles.id,
              sender_id: userDetails.id,
              link_to:
                "/study-record/" + details.id + "?fcID=" + newCommentData.id,
              content: content,
              meta_data: {
                avatar: userDetails?.avatar,
              },
              is_readed: false,
              is_seen: false,
            });
        }
      }
    }
  };
  return (
    <View pt="$3" borderTopWidth="$0.75" borderColor="$green7">
      {replyComment && (
        <View pb={"$3"} pos={"relative"}>
          <Text className="text-gray-500">
            Replying to{" "}
            <Text className="text-black">
              {replyComment.profile_id === userDetails?.id
                ? "Yourself"
                : replyComment.last_name + " " + replyComment.first_name}
            </Text>
          </Text>
          <StyledPressable
            style={{
              position: "absolute",
              right: 10,
            }}
            onPress={() => setReplyComment(null)}
          >
            <X size={"$1"} />
          </StyledPressable>
        </View>
      )}
      <View
        width={"100%"}
        justifyContent="center"
        columnGap="$2"
        pr="$2"
        alignItems="center"
        flexDirection="row"
      >
        {/* <Input placeholder="Type something..." flex={1} /> */}
        <MentionInput
          value={value}
          onChange={setValue}
          inputRef={ref}
          placeholder="Type something..."
          containerStyle={{
            borderWidth: 1,
            flex: 1,
            padding: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
            borderColor: "rgb(180, 223, 196)",
            backgroundColor: "rgb(242, 252, 245)",
          }}
          partTypes={[
            {
              trigger: "@", // Should be a single character like '@' or '#'
              renderSuggestions,
              isInsertSpaceAfterMention: true,
              textStyle: { fontWeight: "bold", color: "rgb(48, 164, 108)" }, // The mention style in the input
            },
          ]}
        />
        <TouchableOpacity onPress={handleComment}>
          <Send />
        </TouchableOpacity>
      </View>
    </View>
  );
}
