import { RealtimeChannel } from "@supabase/supabase-js";
import { create } from "zustand";

export type Participant = {
  id: string;
  avatar: string;
  name: string;
  isRunning: boolean;
  studyTime?: number;
};

type ParticipantsList = {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  room?: RealtimeChannel;
  setRoom: (room: RealtimeChannel) => void;
};

export const useParticipantsList = create<ParticipantsList>((set) => ({
  participants: [],
  setParticipants: (participants) => set({ participants }),
  setRoom: (room) => set({ room }),
}));
