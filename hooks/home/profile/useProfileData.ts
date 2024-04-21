import { Profile } from "@/types/supabase-util-types";
import { create } from "zustand";

type Props = {
  profile: Profile | null;
  setProfile: (profiles: Profile) => void;
};

export const useProfileData = create<Props>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile: profile }),
}));
