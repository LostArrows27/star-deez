import { Comment, StudyRecord } from "@/types/supabase-util-types";
import { create } from "zustand";

export type CommentControl = {
 comments: Comment[];

  setComments: (comments: Comment[]) => void;
};

const initialValue = {

    comments: [],

};

export const useCommentControl = create<CommentControl>((set) => ({
  ...initialValue,
    setComments: (comments) => set({ comments }),

}));