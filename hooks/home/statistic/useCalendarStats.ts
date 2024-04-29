import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { MarkedDates } from "react-native-calendars/src/types";
import { create } from "zustand";

export type CalendarDataProps = {
  [key: string]: MarkingProps & {
    duration: number;
  };
};

type CalendarStatsProps = {
  data: CalendarDataProps;
  setData: (data: CalendarDataProps) => void;
};

export const useCalendarStats = create<CalendarStatsProps>((set) => ({
  data: {},
  setData: (data) => set({ data }),
}));
