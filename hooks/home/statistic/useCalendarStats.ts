import { MarkedDates } from "react-native-calendars/src/types";
import { create } from "zustand";

type CalendarStatsProps = {
  data: MarkedDates;
  setData: (data: MarkedDates) => void;
};

export const useCalendarStats = create<CalendarStatsProps>((set) => ({
  data: {},
  setData: (data) => set({ data }),
}));
