import { StudyingStatus } from "@/types/supabase-util-types";
import { create } from "zustand";

export type FilterStatus = StudyingStatus | "all";

export const useFilterStatus = create<{
  status: StudyingStatus;
  setStatus: (status: StudyingStatus) => void;
}>((set) => ({
  status: "learning",
  setStatus: (status) => set({ status }),
}));
