import { create } from "zustand";
import { RecordProps } from "../statistic/calendar-stats/useDateStats";

type State = {
  records: RecordProps[];
  setRecords: (records: RecordProps[]) => void;
};

export const useChartRecord = create<State>((set) => ({
  records: [],
  setRecords: (records) => set({ records }),
}));
