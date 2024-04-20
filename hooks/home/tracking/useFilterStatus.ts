import { create } from "zustand";

export type StudyingStatus = "studying" | "stand-by" | "done";

export const useFilterStatus = create<{
  status: StudyingStatus;
  setStatus: (status: StudyingStatus) => void;
}>((set) => ({
  status: "studying",
  setStatus: (status) => set({ status }),
}));
