import { emerald } from "@/constants/TailwindColor";

export const convertDurationToColor = (duration: number) => {
  if (duration < 30) return emerald[300];

  if (duration < 60) return emerald[400];

  if (duration < 120) return emerald[500];

  if (duration < 180) return emerald[600];

  return emerald[700];
};
