import { create } from "zustand";

export type RecordProps = {
  id: string;
  created_at: string;
  time: string | null;
  duration: number;
  document: {
    title: string;
  } | null;
};

type DateStatsProps = {
  date: string;
  setDate: (date: string) => void;
  recordData: RecordProps[];
  setRecordData: (recordData: RecordProps[]) => void;
};

export const useDateStats = create<DateStatsProps>((set) => ({
  date: new Date().toISOString(),
  setDate: (date) => set({ date }),
  recordData: [],
  setRecordData: (recordData) => set({ recordData }),
}));
