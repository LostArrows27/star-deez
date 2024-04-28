import { secondsToHMS } from "@/utils/second-to-string";
import { useEffect } from "react";
import { create } from "zustand";

type ClockState = {
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  time: number;
  timeString: string;
  setTime: (time: number) => void;
};

const useManageStudyClock = create<ClockState>((set, get) => ({
  isRunning: false,
  time: 0,
  timeString: "00:00:00",
  start: () => {
    set({ isRunning: true });
  },
  stop: () => {
    set({ isRunning: false });
  },
  reset: () => {
    set({ isRunning: false, time: 0, timeString: "00:00:00" });
  },
  setTime: (time) => {
    set({ time, timeString: secondsToHMS(time) });
  },
}));

export const useClockTimer = () => {
  const { isRunning, time, setTime } = useManageStudyClock();

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else if (!isRunning && intervalId) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time, setTime]);

  return useManageStudyClock();
};
