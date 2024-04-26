import { Comment, StudyRecord } from "@/types/supabase-util-types";
import { create } from "zustand";

export type StudyRecordDetails = {

  data: StudyRecord | null;
  setData: (data: StudyRecord) => void;

};

const initialValue = {
    data: null,


};

export const useStudyRecordDetails = create<StudyRecordDetails>((set) => ({
  ...initialValue,

    setData: (data) => set({ data }),
}));