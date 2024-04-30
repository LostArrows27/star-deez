import { Comment, Profile, StudyRecord } from "@/types/supabase-util-types";
import { Ref } from "react";
import { TextInput } from "react-native";
import { create } from "zustand";

type replyComment = {
  id: string;
  first_name: string;
  last_name: string;
  profile_id: string;
};
export type CommentControl = {
  comments: Comment[];
  inputRef: Ref<TextInput> | undefined;
  replyComment: replyComment | null;
  setInputRef: (inputRef: Ref<TextInput>) => void;
  setReplyComment: (replyComment: replyComment | null) => void;
  setComments: (comments: Comment[]) => void;
};

const initialValue = {
  replyComment: null,
  inputRef: null,
  comments: [],

};

export const useCommentControl = create<CommentControl>((set) => ({
  ...initialValue,
  setInputRef: (inputRef) => set({ inputRef }),
  setReplyComment: (replyComment) => set({ replyComment }),
    setComments: (comments) => set({ comments }),

}));