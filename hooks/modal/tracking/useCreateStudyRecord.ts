import { create } from "zustand";

export type Status = "learning" | "standby" | "finished";

export type UnitRow = {
  id: string;
  name: string;
};

export type CategoryType = UnitRow;

type CreateStudyRecordProps = {
  date: Date | null;
  setDate: (date: Date) => void;
  time: Date | null;
  setTime: (date: Date) => void;
  comment: string;
  setComment: (comment: string) => void;
  learning: {
    from: number;
    to: number;
  };
  setLearning: (learning: { from: number; to: number }) => void;
  duration: number;
  setDuration: (duration: number) => void;

  reset: () => void;
};

export const useCreateStudyRecord = create<CreateStudyRecordProps>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date }),
  time: new Date(),
  setTime: (time) => set({ time }),
  comment: "",
  setComment: (comment) => set({ comment }),
  learning: {
    from: 0,
    to: 0,
  },
  setLearning: (learning) => set({ learning }),
  duration: 0,
  setDuration: (duration) => set({ duration }),
  reset: () =>
    set({
      date: new Date(),
      time: new Date(),
      comment: "",
      learning: {
        from: 0,
        to: 0,
      },
      duration: 0,
    }),
}));
