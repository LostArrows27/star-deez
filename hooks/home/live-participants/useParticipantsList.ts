import { RealtimeChannel } from "@supabase/supabase-js";
import { create } from "zustand";

export type Participant = {
  id: string;
  avatar: string;
  name: string;
};

type ParticipantsList = {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
};

export const useParticipantsList = create<ParticipantsList>((set) => ({
  participants: [],
  setParticipants: (participants) => set({ participants }),
}));
